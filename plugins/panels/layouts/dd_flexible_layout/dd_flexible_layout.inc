<?php
/**
 * @file
 *   DD Flexible Layout panels layout
 *
 * Using ideas from panels_extra_layouts module to create adaptive panels that
 * expand to fill empty space.
 */

/**
 * Implementation of hook_panels_layouts()
 */
// Plugin definition
$plugin = array(
  'title'       => t('DD Flexible Layout'),
  'category'    => t('DD'),
  'icon'        => 'icon.png',
  'css'         => 'dd_flexible_layout.css',

  'theme'       => 'dd_flexible_layout',

  'regions'     => dd_flexible_layout_generate_regions(),

  'settings form'     => 'dd_flexible_layout_settings_form',
  'settings validate' => 'dd_flexible_layout_settings_validate',
  'settings submit'   => 'dd_flexible_layout_settings_submit',
);

function dd_flexible_layout_generate_regions() {
  $regions = array();

  $num_rows = variable_get('dd_flexible_layout_num_rows', 12);

  for ($i = 1; $i <= $num_rows; $i++) {
    $regions["row-$i"] = t('Row !num', array('!num' => $i));
    $regions += dd_flexible_layout_generate_sub_regions($i);
  }

  $num_popups = variable_get('dd_flexible_layout_num_popups', 3);

  for ($i = 1; $i <= $num_popups; $i++) {
    $regions['popup_' . $i] = t('Popup !num', array('!num' => $i));
  }

  return $regions;
}

function dd_flexible_layout_generate_sub_regions($row) {
  $num_columns = variable_get('dd_flexible_layout_num_columns', 6);

  $regions = array();
  for ($i = 1; $i <= $num_columns; $i++) {
    $regions["row-$row-column-$i"] = t('Row !region, Column !num', array('!region' => $row, '!num' => $i));
  }
  return $regions;
}

/**
 * Settings form callback.
 */
function dd_flexible_layout_settings_form($display, $layout, $layout_settings) {

  $default_settings = dd_panels_dd_flexible_layout_default_settings();
  $layout_settings = array_replace_recursive($default_settings, $layout_settings);

  $form = array();

  drupal_alter('dd_flexible_layout_settings_form', $form, $form_state, $layout_settings);

  return $form;
}

/**
 * Settings form validate callback.
 */
function dd_flexible_layout_settings_validate(&$form, &$form_state) {

  // We should probably allow modules to validate their stuff...

}

/**
 * Settings form submit callback.
 */
function dd_flexible_layout_settings_submit(&$form, &$form_state) {

  // We should probably allow modules to alter the way their stuff is submitted.

}
