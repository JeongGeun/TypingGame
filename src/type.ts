import HomeController from './controller/home-controller';
import CompleteController from './controller/complete-controller';
import RenderHomeView from './render/render-home';
import RenderCompleteView from './render/render-complete';


export type Controller = HomeController | CompleteController;
export type View = RenderHomeView | RenderCompleteView;

export type Word = {
    text: string;
    second: number;
};
