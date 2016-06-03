<?php

/**
 * @file
 * Definition of the 'DD Flexible Style' panel style.
 */

// Plugin definition
$plugin = array(
  'title' => t('DD Flexible Layout Style'),
  'description' => t('Style plugin for use with the DD Flexible Layout for panel regions and panes.'),
  'render region' => 'dd_flexible_style_render_region',
  'render pane' => 'dd_flexible_style_render_pane',
  'settings form' => 'dd_flexible_style_region_settings_form',
  'settings form submit' => 'dd_flexible_style_settings_form_submit',
  'pane settings form' => 'dd_flexible_style_pane_settings_form',
  'pane settings form submit' => 'dd_flexible_style_pane_settings_form_submit',
  'hook theme' => array(
    'dd_flexible_style' => array(
      'variables' => array(
        'prefix' => '',
        'suffix' => '',
        'content' => NULL,
      ),
      'path' => drupal_get_path('module', 'dd_panels') . '/plugins/panels/styles/dd_flexible_style',
      'template' => 'dd-flexible-style',
    ),
    'dd_flexible_style_pane' => array(
      'variables' => array(
        'prefix' => '',
        'suffix' => '',
        'content' => NULL,
      ),
      'path' => drupal_get_path('module', 'dd_panels') . '/plugins/panels/styles/dd_flexible_style',
      'template' => 'dd-flexible-style-pane',
    ),
  ),
);

/**
 * Render callback.
 *
 * @ingroup themeable
 */
function theme_dd_flexible_style_render_region($vars) {
  $vars['content'] = implode('', $vars['panes']);

  return theme('dd_flexible_style', $vars);
}

/**
 * Render callback for a single pane.
 */
function theme_dd_flexible_style_render_pane($vars) {
  $content = $vars['content'];
  $pane = $vars['pane'];
  $display = $vars['display'];

  if (empty($content->content)) {
    return;
  }

  $vars['content'] = theme('panels_pane', array('content' => $content, 'pane' => $pane, 'display' => $display));

  $vars['attributes_array'] = dd_flexible_style_attributes($pane->style['settings'], 'pane', $pane->panel . '-pane-' . $pane->pid, $display);

  $wrappers = dd_flexible_style_wrappers($pane->style['settings'], 'pane', $pane->panel . '-pane-' . $pane->pid, $display);

  $vars = array_merge($vars, $wrappers);

  return theme('dd_flexible_style_pane', $vars);
}

/**
 * Settings form callback.
 */
function dd_flexible_style_region_settings_form($style_settings, $display, $pid, $type, $form_state) {

  $form = _dd_flexible_style_settings_form($style_settings, $display, $pid, $type, $form_state);

  return $form;
}

/**
 * Store the preconfigured values.
 */
function dd_flexible_style_settings_form_submit(&$form, &$form_state) {
  _dd_flexible_style_settings_form_submit($form, $form_state);
}

/**
 * Settings form callback.
 */
function dd_flexible_style_pane_settings_form($style_settings, $display, $pid, $type, $form_state) {

  $form = _dd_flexible_style_settings_form($style_settings, $display, $pid, $type, $form_state);

  return $form;
}

/**
 * Store the preconfigured values.
 */
function dd_flexible_style_pane_settings_form_submit(&$form, &$form_state) {
  _dd_flexible_style_settings_form_submit($form, $form_state);
}

function _dd_flexible_style_settings_form($style_settings, $display, $pid, $type, $form_state) {

  $display_id = $display->did;

  if ($type == 'pane') {
    $pane = $display->content[$pid];
    $pid = $pane->panel . '-pane-' . $pid;
  }

  $details = dd_panels_get_region_type($pid);
  $type = $details['type'];

  $default_settings = dd_panels_dd_flexible_style_default_settings($type, $details);
  $style_settings = array_replace_recursive($default_settings, $style_settings);

  $form = array();

  $form['type'] = array(
    '#type' => 'hidden',
    '#value' => $type,
  );

  $form['display_id'] = array(
    '#type' => 'hidden',
    '#value' => $display_id,
  );

  $form['pid'] = array(
    '#type' => 'hidden',
    '#value' => $pid,
  );

  $css = drupal_get_path('module', 'dd_panels') . '/plugins/panels/styles/dd_flexible_style/dd_flexible_style.admin.css';

  drupal_add_css($css);

  $form = array();

  $breakpoints = dd_panels_dd_flexible_style_get_breakpoints();

  $inherit = array();
  $previous_size = '';
  foreach ($breakpoints as $size => $breakpoint) {
    if (empty($previous_size)) {
      $inherit[$size] = array();
    }
    else {
      $inherit[$size] = array('' => t('Inherit from !previous', array('!previous' => $previous_size)));
    }
    $previous_size = $breakpoint['label'];
  }

  $form['breakpoints'] = array(
    '#theme' => 'dd_panels_dd_flexible_style_breakpoints_table',
    '#breakpoints' => $breakpoints,
    '#inherit' => $inherit,
  );

  drupal_alter('dd_flexible_style_settings_form', $form, $form_state, $details, $style_settings);

  // This could be moved somewhere but for now it's OK here.
  if ($type == 'row' || $type == 'column') {
    $form['force_show'] = array(
      '#type' => 'checkbox',
      '#title' => t('Force this region to show'),
      '#default_value' => $style_settings['force_show'],
      '#description' => t("Force this region to show even if it doesn't have any content."),
    );
  }

  return $form;
}

/**
 * Store the preconfigured values.
 */
function _dd_flexible_style_settings_form_submit(&$form, &$form_state) {

  foreach ($form_state['breakpoints'] as $size => $values) {
    $form_state[$size] = $values;
  }
  unset($form_state['breakpoints']);


  if (!empty($form_state['display_id']) || !empty($form_state['pid'])) {
    $display_id = $form_state['display_id'];
    $pid = $form_state['pid'];
    $type = $form_state['type'];

    // We create a unique name for our entity type so we can find it again.
    $entity_type = "type:{$type}:display:{$display_id}|pid:{$pid}";

    // First remove any existing file usage record for this pane.
    $usages = db_select('file_usage', 'fu')
      ->fields('fu', array('fid', 'count'))
      ->condition('fu.type', $entity_type)
      ->execute();

    foreach ($usages as $usage) {
      if ($file = file_load($usage->fid)) {
        file_usage_delete($file, 'dd_panels', $entity_type, $id = NULL, $count = 0);
      }
    }
    // Now we add reference to the bg image if there is one.
    if (!empty($form_state['bg_image']) && $file = file_load($form_state['bg_image'])) {
      file_usage_add($file, 'dd_panels', $entity_type, 1, 1);
    }
  }
}
