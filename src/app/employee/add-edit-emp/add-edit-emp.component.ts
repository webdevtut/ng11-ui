import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.scss']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private sharedService: SharedService) { }
  @Input() emp: any;
  EmployeeId!:string;
  EmployeeName!:string;
  Department!:string;
  DateOfJoining!:string;
  PhotoFileName!:string;
  PhotoFilePath!:string;

  DepartmentsList:any =[];


  ngOnInit(): void {
    this.loadDepartmentNames();
  }

  loadDepartmentNames(){
    this.sharedService.getAllDepartmentNames().subscribe(data => {
      this.DepartmentsList = data;
      this.EmployeeId = this.emp.EmployeeId;
      this.EmployeeName = this.emp.EmployeeName;
      this.Department = this.emp.Department;
      this.DateOfJoining = this.emp.DateOfJoining;
      this.PhotoFileName = this.emp.PhotoFileName;
      this.PhotoFilePath = this.sharedService.PhotoUrl + "/"+this.PhotoFileName;
    })
  }

  addEmployee(){
    let obj = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };
    this.sharedService.addEmployee(obj).subscribe(res => {
      alert(res.toString());
    });
  }

  updateEmployee(){
    let obj = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName
    };
    console.log(obj);
    this.sharedService.updateEmployee(obj).subscribe(res => {
      alert(res.toString());
    });
  }

  uploadPhoto(event:any){
    var file = event.target.files[0];
    console.log(file);
    const formData: FormData = new FormData();
    formData.append('uploadedFile',file,file.name);
    this.sharedService.UploadPhoto(formData).subscribe(data => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.sharedService.PhotoUrl + "/"+this.PhotoFileName;
    })
  }

}