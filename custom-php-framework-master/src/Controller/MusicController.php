<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Music;
use App\Service\Router;
use App\Service\Templating;

class MusicController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $musicc = Music::findAll();
        $html = $templating->render('music/index.html.php', [
            'musicc' => $musicc,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestPost, Templating $templating, Router $router): ?string
    {
        if ($requestPost) {
            $music = Music::fromArray($requestPost);
            // @todo missing validation
            $music->save();

            $path = $router->generatePath('music-index');
            $router->redirect($path);
            return null;
        } else {
            $music = new Music();
        }

        $html = $templating->render('music/create.html.php', [
            'music' => $music,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $musicId, ?array $requestPost, Templating $templating, Router $router): ?string
    {
        $music = Music::find($musicId);
        if (! $music) {
            throw new NotFoundException("Missing post with id $musicId");
        }

        if ($requestPost) {
            $music->fill($requestPost);
            // @todo missing validation
            $music->save();

            $path = $router->generatePath('music-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('music/edit.html.php', [
            'music' => $music,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $musicId, Templating $templating, Router $router): ?string
    {
        $music= Music::find($musicId);
        if (! $music) {
            throw new NotFoundException("Missing post with id $musicId");
        }

        $html = $templating->render('music/show.html.php', [
            'music' => $music,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $musicId, Router $router): ?string
    {
        $music = Music::find($musicId);
        if (! $music) {
            throw new NotFoundException("Missing post with id $musicId");
        }

        $music->delete();
        $path = $router->generatePath('music-index');
        $router->redirect($path);
        return null;
    }
}
