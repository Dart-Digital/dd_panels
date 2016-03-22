<?php
/**
 * @file
 *
 * Template for the DD Flexible Style panels style plugin.
 *
 * - $attributes: The attributes for the wrapper div.
 * - $content: The content of the box.
 */
?>
<?php print $prefix; ?>
<div<?php print $attributes; ?>>
  <?php print $inner_prefix; ?>
  <?php print $content; ?>
  <?php print $inner_suffix; ?>
</div>
<?php print $suffix; ?>
