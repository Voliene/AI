<?php
    /** @var $music ?\App\Model\Music */
?>

<div class="form-group">
    <label for="subject">New Subject</label>
    <input type="text" id="subject" name="music[subject]" value="<?= $music ? $music->getSubject() : '' ?>">
</div>

<div class="form-group">
    <label for="content">New Content</label>
    <textarea id="content" name="music[content]"><?= $music? $music->getContent() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
