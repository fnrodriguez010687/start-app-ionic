import { Component, OnInit, ViewChild,  } from '@angular/core';

import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Swiper, Virtual } from 'swiper';

SwiperCore.use([Virtual]);

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss']
})
export class IntroPage implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  next(){
    this.swiper?.swiperRef.slideNext(100);
  }

  async start() {
    await Storage.set({key: INTRO_KEY, value: 'true'});
    this.router.navigateByUrl('/login', { replaceUrl:true });
  }

}
