<?php
/**
 * @file
 * Template for the DD Flexible Layout panel layout.
 */
?>
  <?php foreach ($regions as $id => $row): ?>
    <?php if (!$row['empty']): ?>
      <?php print $row['prefix']; ?>
      <div<?php print drupal_attributes($row['attributes']); ?>>
        <?php print $row['inner_prefix']; ?>
        <?php print $row['content']; ?>
        <div class="row">
          <?php foreach($row['columns'] as $key => $column): ?>
            <?php if (!$column['empty']): ?>
              <?php print $column['prefix']; ?>
              <div<?php print drupal_attributes($column['attributes']); ?>>
                <?php print $column['inner_prefix']; ?>
                <div class="row">
                  <?php print $column['content']; ?>
                </div>
                <?php print $column['inner_suffix']; ?>
              </div>
              <?php print $column['suffix']; ?>
            <?php endif; ?>
          <?php endforeach; ?>
        </div>
        <?php print $row['inner_suffix']; ?>
      </div>
      <?php print $row['suffix']; ?>
    <?php endif; ?>
  <?php endforeach; ?>

  <?php if (!empty($popup)): ?>
  <div id="popup_1" class="popup-wrapper reveal" data-reveal aria-hidden="true" role="dialog">
    <div class="popup-inner row">
      <?php print $popup; ?>
    </div>
    <button class="close-button" data-close aria-label="Close modal" type="button">
      <span aria-hidden="true">&#215;</span>
    </button>
  </div>
  <?php endif; ?>

  <?php if (!empty($popup_2)): ?>
  <div id="popup_2" class="popup-wrapper reveal" data-reveal aria-hidden="true" role="dialog">
    <div class="popup-inner row">
      <div class="popup-content">
        <?php print $popup_2; ?>
      </div>
    </div>
    <button class="close-button" data-close aria-label="Close modal" type="button">
      <span aria-hidden="true">&#215;</span>
    </button>
  </div>
  <?php endif; ?>

  <?php if (!empty($popup_3)): ?>
  <div id="popup_3" class="popup-wrapper reveal" data-reveal aria-hidden="true" role="dialog">
    <div class="popup-inner row">
      <div class="popup-content">
        <?php print $popup_3; ?>
      </div>
    </div>
    <button class="close-button" data-close aria-label="Close modal" type="button">
      <span aria-hidden="true">&#215;</span>
    </button>
  </div>
  <?php endif; ?>
