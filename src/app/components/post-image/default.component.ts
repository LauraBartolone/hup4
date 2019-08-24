import { Component, Input } from '@angular/core';
// import { MenuController } from 'ionic-angular';

@Component({
  selector: 'post-image',
  templateUrl: './default.html'
})
export class PostImageComponent {
  @Input() imgSrc = '../assets/img/home.svg';

  constructor(
    // public menu: MenuController,
    // private modalController: ModalController,
    // private navController: NavController,
    ) {
  }


}
