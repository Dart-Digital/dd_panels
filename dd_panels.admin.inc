<?php

/**
 * @file
 * Settings form.
 */

/**
 * Allow other modules to add their items to the settings form.
 */
function dd_panels_dd_flexible_style_settings_form($form, &$form_state) {
  drupal_alter('dd_panels_dd_flexible_style_settings_form', $form, $form_state);
  $form['#submit'][] = 'dd_panels_dd_flexible_style_settings_form_submit';
  return system_settings_form($form);
}

/**
 * Allow other modules to validate their own settings.
 */
function dd_panels_dd_flexible_style_settings_form_validate($form, &$form_state) {
  drupal_alter('dd_panels_dd_flexible_style_settings_form_validate', $form, $form_state);
}

/**
 * Allow other modules to handle their submissions.
 */
function dd_panels_dd_flexible_style_settings_form_submit($form, &$form_state) {
  drupal_alter('dd_panels_dd_flexible_style_settings_form_submit', $form, $form_state);
}
