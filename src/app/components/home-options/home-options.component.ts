import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-home-options',
  templateUrl: './home-options.component.html',
  styleUrls: ['./home-options.component.scss'],
})
export class HomeOptionsComponent implements OnInit {
  constructor(public router: Router, public popoverController: PopoverController) {}

  ngOnInit() {}
  async goToPage(route) {
    this.router.navigate([route]);
    await this.popoverController.dismiss();
  }
}
