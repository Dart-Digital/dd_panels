<?php
/**
 * @file
 * Template for the DD Flexible Layout panel layout.
 */
?>
<?php print $wrappers['prefix']; ?>
<div<?php print $attributes; ?>>
<?php print $wrappers['inner_prefix']; ?>
  <?php foreach ($regions as $id => $row): ?>
    <?php if (!$row['empty']): ?>
      <?php print $row['prefix']; ?>
      <div<?php print drupal_attributes($row['attributes']); ?>>
        <?php print $row['inner_prefix']; ?>
        <?php print $row['content']; ?>
        <div<?php print drupal_attributes($row['child_attributes']); ?>>
          <?php foreach($row['columns'] as $key => $column): ?>
            <?php if (!$column['empty']): ?>
              <?php print $column['prefix']; ?>
              <div<?php print drupal_attributes($column['attributes']); ?>>
                <?php print $column['inner_prefix']; ?>
                <div<?php print drupal_attributes($column['child_attributes']); ?>>
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

  <?php if (!empty($popups)): ?>
    <?php foreach ($popups as $id => $popup): ?>
      <?php if (!empty($popup)): ?>
      <div id="<?php print $id; ?>" class="popup-wrapper reveal" data-reveal aria-hidden="true" role="dialog">
        <div class="popup-inner row">
          <div<?php print drupal_attributes($popup['attributes']); ?>>
            <div class="row">
              <?php print $popup['content']; ?>
            </div>
          </div>
        </div>
        <button class="close-button" data-close aria-label="Close modal" type="button">
          <span aria-hidden="true">&#215;</span>
        </button>
      </div>
      <?php endif; ?>
    <?php endforeach; ?>
  <?php endif; ?>
<?php print $wrappers['inner_suffix']; ?>
</div>
<?php print $wrappers['suffix']; ?>
