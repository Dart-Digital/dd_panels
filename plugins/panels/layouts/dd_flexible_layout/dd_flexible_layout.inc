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

//  'settings form'     => 'dd_flexible_layout_settings_form',
//  'settings validate' => 'dd_flexible_layout_settings_validate',
//  'settings submit'   => 'dd_flexible_layout_settings_submit',
);

function dd_flexible_layout_generate_regions() {
  $regions = array();

  $num_rows = variable_get('dd_flexible_layout_num_columns', 12);

  for ($i = 1; $i <= $num_rows; $i++) {
    $regions["row-$i"] = t('Row !num', array('!num' => $i));
    $regions += dd_flexible_layout_generate_sub_regions($i);
  }

  $regions['popup'] = t('Popup 1');
  $regions['popup_2'] = t('Popup 2');
  $regions['popup_3'] = t('Popup 3');

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
