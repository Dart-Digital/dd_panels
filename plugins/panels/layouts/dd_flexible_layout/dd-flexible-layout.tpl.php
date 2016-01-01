<?php
/**
 * @file
 * Template for the DD Flexible Layout panel layout.
 */
?>
  <?php foreach ($regions as $id => $row): ?>
    <?php if (!empty($row['columns'])): ?>
    <div<?php print drupal_attributes($row['attributes']); ?>>
      <?php print $row['content']; ?>
      <div class="row">
        <?php foreach($row['columns'] as $key => $column): ?>
          <?php if (!empty($column['content'])): ?>
            <div<?php print drupal_attributes($column['attributes']); ?>>
              <div class="row">
                <?php print $column['content']; ?>
              </div>
            </div>
          <?php endif; ?>
        <?php endforeach; ?>
      </div>
    </div>
    <?php endif; ?>
  <?php endforeach; ?>

  <?php if (!empty($popup)): ?>
  <div id="popup_1" class="popup-wrapper reveal-modal" data-reveal aria-hidden="true" role="dialog">
    <div class="popup-inner row">
      <?php print $popup; ?>
    </div>
    <a class="close-reveal-modal">&#215;</a>
  </div>
  <?php endif; ?>

  <?php if (!empty($popup_2)): ?>
  <div id="popup_2" class="popup-wrapper reveal-modal" data-reveal aria-hidden="true" role="dialog">
    <div class="popup-inner row">
      <div class="popup-content">
        <?php print $popup_2; ?>
      </div>
    </div>
    <a class="close-reveal-modal">&#215;</a>
  </div>
  <?php endif; ?>

  <?php if (!empty($popup_3)): ?>
  <div id="popup_3" class="popup-wrapper reveal-modal" data-reveal aria-hidden="true" role="dialog">
    <div class="popup-inner row">
      <div class="popup-content">
        <?php print $popup_3; ?>
      </div>
    </div>
    <a class="close-reveal-modal">&#215;</a>
  </div>
  <?php endif; ?>
