import { Component } from '@angular/core';
import { AdminProfileService } from 'src/app/service/admin-profile.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-admin-profile-page',
  templateUrl: './admin-profile-page.component.html',
  styleUrls: ['./admin-profile-page.component.scss'],
})
export class AdminProfilePageComponent {
  adminProfile: any;
  id: string = '';
  fullName: string = '';
  displayDialog: boolean = false;
  passwordType = 'password';

  constructor(public profileService: AdminProfileService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.profileService.getUserProfile().subscribe({
      next: (data: any) => {
        console.log(data);
        this.id = data._id;
        this.fullName = data.fullName;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  showDialog() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  saveProfile() {
    // Logic to save the edited profile
    // You can retrieve the updated profile data from your form or inputs
    // and perform any necessary actions
    // After saving, you can close the dialog by calling hideDialog()
    console.log('save profile');
    this.hideDialog();
  }
}
