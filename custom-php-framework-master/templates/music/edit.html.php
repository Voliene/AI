<?php

/** @var \App\Model\Post $music */
/** @var \App\Service\Router $router */

$title = "Edit Post {$music->getSubject()} ({$music->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('music-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="post-edit">
        <input type="hidden" name="id" value="<?= $music->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('music-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $router->generatePath('music-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="music-delete">
                <input type="hidden" name="id" value="<?= $music->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
