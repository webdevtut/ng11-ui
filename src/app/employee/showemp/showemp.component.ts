import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-showemp',
  templateUrl: './showemp.component.html',
  styleUrls: ['./showemp.component.scss']
})
export class ShowempComponent implements OnInit {

  constructor(private sharedService : SharedService) { }

  EmployeeList: any = [];
  ModalTitle!: string;
  ActivateAddEditEmpComp: boolean=false;
  emp:any;

  
  EmployeeIdFilter: string = "";
  EmployeeNameFilter: string = "";
  EmployeeListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.sharedService.getEmpList().subscribe(data => {
        this.EmployeeList = data;
        this.EmployeeListWithoutFilter = data;
      })
  }

  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName: "",
      Department: "",
      DateOfjoining: "",
      PhotoFilename: "anonymous.jpg"
    }
    this.ModalTitle="Add Employee"
    this.ActivateAddEditEmpComp= true;
  }

  closeClick(){
    this.ActivateAddEditEmpComp= false;
    this.refreshEmpList();
  }


  editClick(item:any){
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure?')){
      this.sharedService.deleteEmployee(item.EmployeeId).subscribe(res => {
        alert(res.toString());
        this.refreshEmpList();
      })
    }
  }

  FilterFn(){
    var EmployeeNameFilter = this.EmployeeNameFilter
    var EmployeeIdFilter = this.EmployeeIdFilter

    this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (el:any){
      return el.EmployeeId.toString().toLowerCase().includes(
        EmployeeIdFilter.toString().trim().toLowerCase()
      )&&
      el.EmployeeName.toString().toLowerCase().includes(
        EmployeeNameFilter.toString().trim().toLowerCase()
      )
    })
  }

}