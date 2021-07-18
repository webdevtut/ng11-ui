import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.scss']
})
export class AddEditDepComponent implements OnInit {

  constructor(private sharedService: SharedService) { }
  @Input() dep: any;
  DepartmentId!:string;
  DepartmentName!:string;


  ngOnInit(): void {
    this.DepartmentId = this.dep.DepartmentId;
    this.DepartmentName = this.dep.DepartmentName;  
    console.log(this.dep.DepartmentId);
  }

  addDepartment(){
    let obj = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.sharedService.addDepartment(obj).subscribe(res => {
      alert(res.toString());
    });
  }

  updateDepartment(){
    let obj = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.sharedService.updateDepartment(obj).subscribe(res => {
      alert(res.toString());
    });
  }

}
