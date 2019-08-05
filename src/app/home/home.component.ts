import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {CreateGroupModalPage} from "../create-group-modal/create-group-modal.page";
import {GroupService} from "./group.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  dataReturned: any;

  private userData = {
      jwt: localStorage.getItem('id_token')
  };

  public groups;

  constructor(private modalController: ModalController,
              private _groupService: GroupService) { }

  ngOnInit() {
      this.getGroups();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateGroupModalPage,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data
      }
    });
    return await modal.present();
  }

  getGroups() {
      this._groupService.getUserGroups(this.userData).subscribe((result) => {
          if (result['data'] !== 'null') {
              this.groups = result['data'];
              console.log(this.groups);
          } else {
              this.groups = null;
          }
      })
  }


}
