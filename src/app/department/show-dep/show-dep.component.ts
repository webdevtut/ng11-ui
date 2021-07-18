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

  ngOnInit(): void {
    this.refreshDepList();
  }

  refreshDepList(){
    this.sharedService.getDepList().subscribe(data => {
        this.DepartmentList = data;
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

}
