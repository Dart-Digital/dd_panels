<?php

/**
 * @file
 * Settings form.
 */

/**
 * Allow other modules to add their items to the settings form.
 */
function dd_panels_settings_form($form, &$form_state) {

  $form['dd_flexible_layout_num_rows'] = array(
    '#type' => 'textfield',
    '#title' => t('Number of rows'),
    '#description' => t('The number of rows in the layout for each page. Increase this if you run out of available rows.'),
    '#default_value' => variable_get('dd_flexible_layout_num_rows', 12),
  );

  $form['dd_flexible_layout_num_columns'] = array(
    '#type' => 'textfield',
    '#title' => t('Number of columns'),
    '#description' => t('The number of columns in each row. Increase this if you run out of available columns.'),
    '#default_value' => variable_get('dd_flexible_layout_num_columns', 6),
  );

  $form['dd_flexible_layout_num_popups'] = array(
    '#type' => 'textfield',
    '#title' => t('Number of popups'),
    '#description' => t('The number of popups for each page. Increase this if you run out of available popups.'),
    '#default_value' => variable_get('dd_flexible_layout_num_popups', 3),
  );

  drupal_alter('dd_panels_settings_form', $form, $form_state);
  $form['#submit'][] = 'dd_panels_settings_form_submit';
  return system_settings_form($form);
}

/**
 * Allow other modules to validate their own settings.
 */
function dd_panels_settings_form_validate($form, &$form_state) {
  drupal_alter('dd_panels_settings_form_validate', $form, $form_state);
}

/**
 * Allow other modules to handle their submissions.
 */
function dd_panels_settings_form_submit($form, &$form_state) {
  drupal_alter('dd_panels_settings_form_submit', $form, $form_state);
}
