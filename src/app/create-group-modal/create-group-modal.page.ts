import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../home/group.service";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.page.html',
  styleUrls: ['./create-group-modal.page.scss'],
})
export class CreateGroupModalPage implements OnInit {

  createGroupForm: FormGroup;

  constructor(private modalController: ModalController,
              private _groupService: GroupService,
              private formBuilder: FormBuilder,
              private _authService: AuthenticationService,
              router: Router) {
    // if (this._authService.isAuthenticated()) {
    //   router.navigate(['home'])
    // }
  }

  ngOnInit() {
    this.createGroupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      numberOfInvites: new FormControl('', Validators.required),
      invites: new FormArray([])
    });
  }

  get f() { return this.createGroupForm.controls; }
  get t() { return this.f.invites as FormArray; }

  // dynamically add form fields for invites in view
  onChangeInvites(e) {
    const inviteAmount = e.target.value || 0;
    if (this.t.length < inviteAmount) {
      for (let i = this.t.length; i < inviteAmount; i++) {
        this.t.push(this.formBuilder.control({
          i: ['', [Validators.required, Validators.email]]
        }));
      }
    } else {
      for (let i = this.t.length; i >= inviteAmount; i--){
        this.t.removeAt(i);
      }
    }
  }

  public data = {
    jwt: localStorage.getItem('id_token')
  };
  public response;

  createGroup() {
    this._groupService.createGroup(this.data).subscribe((result)=> {
      this.response = result;
    })
  }



  async closeModal() {
    this.modalController.dismiss();
  }

}
