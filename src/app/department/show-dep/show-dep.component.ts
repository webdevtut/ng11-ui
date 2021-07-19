import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.scss']
})
export class ShowDepComponent implements OnInit {

  constructor(private sharedService : SharedService) { }

  DepartmentList: any = [];
  ModalTitle!: string;
  ActivateAddEditDepComp: boolean=false;
  dep:any;

  DepartmentIdFilter: string = "";
  DepartmentNameFilter: string = "";
  DepartmentListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshDepList();
  }

  refreshDepList(){
    this.sharedService.getDepList().subscribe(data => {
        this.DepartmentList = data;
        this.DepartmentListWithoutFilter = data;
      })
  }

  addClick(){
    this.dep={
      DepartmetId:0,
      DepartmentName: ""
    }
    this.ModalTitle="Add Department"
    this.ActivateAddEditDepComp= true;
  }

  closeClick(){
    this.ActivateAddEditDepComp= false;
    this.refreshDepList();
  }


  editClick(item:any){
    this.dep=item;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditDepComp=true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure?')){
      this.sharedService.deleteDepartment(item.DepartmentId).subscribe(res => {
        alert(res.toString());
        this.refreshDepList();
      })
    }
  }

  FilterFn(){
    var DepartmentNameFilter = this.DepartmentNameFilter
    var DepartmentIdFilter = this.DepartmentIdFilter

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el:any){
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      )&&
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    })
  }

  // sortResult(){
    
  //   this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a:any,b:any){
  //     if(asc){
  //       return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
  //     }else{
  //       return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);

  //     }
  //   })
  // }

}
