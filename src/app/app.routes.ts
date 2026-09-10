import { Routes } from '@angular/router';
import { Game } from './features/game/game';
import { Home } from './features/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'game',
        component: Game
    },
    {
        path: '**',
        redirectTo: '',
    },
];
