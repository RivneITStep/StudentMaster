(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{kNNV:function(t,e,i){"use strict";i.r(e);var c=i("ofXK"),s=i("tyNb"),a=i("auE4"),o=i("g6P3"),n=i("ifH6"),l=i("D7qI"),r=i("0IaG"),b=i("fXoL"),d=i("kmnG"),u=i("qFsG"),h=i("bTqV");let m=(()=>{class t{constructor(t,e,i,c){this.tools=t,this.dialogRef=e,this.adminService=i,this.data=c,this.userEmail="",this.isLoading=!1}ngOnInit(){}cancel(){this.dialogRef.close()}onSubmit(){this.isLoading=!0,this.adminService.inviteUser(this.userEmail,this.data.classId).subscribe(()=>{this.tools.showNotification("User has been invited"),this.isLoading=!1,this.dialogRef.close()},()=>{this.isLoading=!1,this.dialogRef.close()})}}return t.\u0275fac=function(e){return new(e||t)(b.Sb(l.a),b.Sb(r.f),b.Sb(n.a),b.Sb(r.a))},t.\u0275cmp=b.Mb({type:t,selectors:[["app-invite-user"]],decls:12,vars:6,consts:[["mat-dialog-title",""],["mat-dialog-content",""],[1,"cell-12"],["matInput","","placeholder","Input user's emai",3,"input"],["mat-raised-button","","color","primary",2,"margin-left","1rem","margin-right","1rem",3,"disabled","click"],["mat-raised-button","","color","accent",2,"margin-left","1rem","margin-right","1rem",3,"disabled","click"],["mat-dialog-actions",""]],template:function(t,e){1&t&&(b.Yb(0,"h1",0),b.Mc(1,"ADD STUDENT"),b.Xb(),b.Yb(2,"div",1),b.Yb(3,"mat-form-field",2),b.Yb(4,"mat-label"),b.Mc(5,"Input user's email"),b.Xb(),b.Yb(6,"input",3),b.gc("input",(function(t){return e.userEmail=t.target.value})),b.Xb(),b.Xb(),b.Yb(7,"button",4),b.gc("click",(function(t){return e.onSubmit()})),b.Mc(8,"Invite"),b.Xb(),b.Yb(9,"button",5),b.gc("click",(function(t){return e.cancel()})),b.Mc(10,"Cancel"),b.Xb(),b.Xb(),b.Tb(11,"div",6)),2&t&&(b.Eb(7),b.Ib("spinner",e.isLoading),b.qc("disabled",e.isLoading),b.Eb(2),b.Ib("spinner",e.isLoading),b.qc("disabled",e.isLoading))},directives:[r.g,r.d,d.b,d.f,u.b,h.b,r.c],styles:[""]}),t})();var p=i("3Pt+"),g=i("A5z7"),f=i("/1cH"),v=i("NFeN"),S=i("FKr1");function C(t,e){1&t&&(b.Yb(0,"mat-icon",15),b.Mc(1,"cancel"),b.Xb())}function I(t,e){if(1&t){const t=b.Zb();b.Yb(0,"mat-chip",13),b.gc("removed",(function(i){b.Dc(t);const c=e.$implicit;return b.kc().remove(c)})),b.Mc(1),b.Kc(2,C,2,0,"mat-icon",14),b.Xb()}if(2&t){const t=e.$implicit,i=b.kc();b.qc("selectable",i.selectable)("removable",i.removable),b.Eb(1),b.Oc(" ",t.name," "),b.Eb(1),b.qc("ngIf",i.removable)}}function X(t,e){if(1&t&&(b.Yb(0,"mat-option",16),b.Mc(1),b.Xb()),2&t){const t=e.$implicit;b.qc("value",t),b.Eb(1),b.Oc(" ",t.name," ")}}let Y=(()=>{class t{constructor(t,e,i,c){this.tools=t,this.dialogRef=e,this.adminService=i,this.data=c,this.visible=!0,this.selectable=!0,this.removable=!0,this.fruitCtrl=new p.f,this.subjects=[],this.allSubjects=[],this.userEmail="",this.isLoading=!1,this.update()}ngOnInit(){}cancel(){this.dialogRef.close()}add(t){console.log(t),this.fruitCtrl.setValue(null)}remove(t){this.adminService.editSubjectsInClass(this.data.classId,t.id).subscribe(()=>{this.tools.showNotification("Success"),this.update()})}selected(t){console.log(t),this.adminService.editSubjectsInClass(this.data.classId,t.option.value.id).subscribe(()=>{this.tools.showNotification("Success"),this.update()})}update(){this.isLoading=!0,this.adminService.getAllSubjects().subscribe(t=>{this.allSubjects=t,this.adminService.getClassSubjects(this.data.classId).subscribe(t=>{this.subjects=t,this.isLoading=!1,this.subjects.forEach(t=>{this.allSubjects.find(e=>e.id===t.id)&&(this.allSubjects=this.allSubjects.filter(e=>e.id!==t.id))})})})}close(){this.dialogRef.close()}}return t.\u0275fac=function(e){return new(e||t)(b.Sb(l.a),b.Sb(r.f),b.Sb(n.a),b.Sb(r.a))},t.\u0275cmp=b.Mb({type:t,selectors:[["app-edit-subjects-in-class"]],decls:15,vars:8,consts:[["mat-dialog-title",""],["mat-dialog-content",""],[1,"cell-12"],["aria-label","Subjects selection"],["chipList",""],["color","accent",3,"selectable","removable","removed",4,"ngFor","ngForOf"],["placeholder","Subjects",3,"formControl","matAutocomplete","matChipInputFor","matChipInputTokenEnd"],["fruitInput",""],[3,"optionSelected"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],["mat-dialog-actions",""],["mat-button","",3,"disabled","click"],["color","accent",3,"selectable","removable","removed"],["matChipRemove","",4,"ngIf"],["matChipRemove",""],[3,"value"]],template:function(t,e){if(1&t&&(b.Yb(0,"h1",0),b.Mc(1,"EDIT SUBJECTS"),b.Xb(),b.Yb(2,"div",1),b.Yb(3,"mat-form-field",2),b.Yb(4,"mat-chip-list",3,4),b.Kc(6,I,3,4,"mat-chip",5),b.Yb(7,"input",6,7),b.gc("matChipInputTokenEnd",(function(t){return e.add(t)})),b.Xb(),b.Xb(),b.Yb(9,"mat-autocomplete",8,9),b.gc("optionSelected",(function(t){return e.selected(t)})),b.Kc(11,X,2,2,"mat-option",10),b.Xb(),b.Xb(),b.Xb(),b.Yb(12,"div",11),b.Yb(13,"button",12),b.gc("click",(function(t){return e.close()})),b.Mc(14,"Close"),b.Xb(),b.Xb()),2&t){const t=b.zc(5),i=b.zc(10);b.Eb(6),b.qc("ngForOf",e.subjects),b.Eb(1),b.qc("formControl",e.fruitCtrl)("matAutocomplete",i)("matChipInputFor",t),b.Eb(4),b.qc("ngForOf",e.allSubjects),b.Eb(2),b.Ib("spinner",e.isLoading),b.qc("disabled",e.isLoading)}},directives:[r.g,r.d,d.b,g.c,c.k,p.c,f.c,g.b,p.o,p.g,f.a,r.c,h.b,g.a,c.l,v.a,g.d,S.n],styles:[""]}),t})();function k(t,e){1&t&&(b.Yb(0,"mat-icon",15),b.Mc(1,"cancel"),b.Xb())}function E(t,e){if(1&t){const t=b.Zb();b.Yb(0,"mat-chip",13),b.gc("removed",(function(i){b.Dc(t);const c=e.$implicit;return b.kc().remove(c)})),b.Mc(1),b.Kc(2,k,2,0,"mat-icon",14),b.Xb()}if(2&t){const t=e.$implicit,i=b.kc();b.qc("selectable",i.selectable)("removable",i.removable),b.Eb(1),b.Oc(" ",t.pib," "),b.Eb(1),b.qc("ngIf",i.removable)}}function w(t,e){if(1&t&&(b.Yb(0,"mat-option",16),b.Mc(1),b.Xb()),2&t){const t=e.$implicit;b.qc("value",t),b.Eb(1),b.Oc(" ",t.pib," ")}}let M=(()=>{class t{constructor(t,e,i,c){this.tools=t,this.dialogRef=e,this.adminService=i,this.data=c,this.visible=!0,this.selectable=!0,this.removable=!0,this.teacherCtrl=new p.f,this.teachers=[],this.allTeachers=[],this.userEmail="",this.isLoading=!1,this.update()}ngOnInit(){}cancel(){this.dialogRef.close()}add(t){console.log(t),this.teacherCtrl.setValue(null)}remove(t){this.adminService.editTeachersInClass(this.data.classId,t.id).subscribe(()=>{this.tools.showNotification("Success"),this.update()})}selected(t){console.log(t),this.adminService.editTeachersInClass(this.data.classId,t.option.value.id).subscribe(()=>{this.tools.showNotification("Success"),this.update()})}update(){this.isLoading=!0,this.adminService.getAllTeachers().subscribe(t=>{this.allTeachers=t,this.adminService.getClassTeachers(this.data.classId).subscribe(t=>{this.teachers=t,this.isLoading=!1,this.teachers.forEach(t=>{this.allTeachers.find(e=>e.id===t.id)&&(this.allTeachers=this.allTeachers.filter(e=>e.id!==t.id))})})})}close(){this.dialogRef.close()}}return t.\u0275fac=function(e){return new(e||t)(b.Sb(l.a),b.Sb(r.f),b.Sb(n.a),b.Sb(r.a))},t.\u0275cmp=b.Mb({type:t,selectors:[["app-edit-teachers-in-class"]],decls:15,vars:8,consts:[["mat-dialog-title",""],["mat-dialog-content",""],[1,"cell-12"],["aria-label","Subjects selection"],["chipList",""],["color","accent",3,"selectable","removable","removed",4,"ngFor","ngForOf"],["placeholder","Teachers",3,"formControl","matAutocomplete","matChipInputFor","matChipInputTokenEnd"],["fruitInput",""],[3,"optionSelected"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],["mat-dialog-actions",""],["mat-button","",3,"disabled","click"],["color","accent",3,"selectable","removable","removed"],["matChipRemove","",4,"ngIf"],["matChipRemove",""],[3,"value"]],template:function(t,e){if(1&t&&(b.Yb(0,"h1",0),b.Mc(1,"EDIT TEACHERS"),b.Xb(),b.Yb(2,"div",1),b.Yb(3,"mat-form-field",2),b.Yb(4,"mat-chip-list",3,4),b.Kc(6,E,3,4,"mat-chip",5),b.Yb(7,"input",6,7),b.gc("matChipInputTokenEnd",(function(t){return e.add(t)})),b.Xb(),b.Xb(),b.Yb(9,"mat-autocomplete",8,9),b.gc("optionSelected",(function(t){return e.selected(t)})),b.Kc(11,w,2,2,"mat-option",10),b.Xb(),b.Xb(),b.Xb(),b.Yb(12,"div",11),b.Yb(13,"button",12),b.gc("click",(function(t){return e.close()})),b.Mc(14,"Close"),b.Xb(),b.Xb()),2&t){const t=b.zc(5),i=b.zc(10);b.Eb(6),b.qc("ngForOf",e.teachers),b.Eb(1),b.qc("formControl",e.teacherCtrl)("matAutocomplete",i)("matChipInputFor",t),b.Eb(4),b.qc("ngForOf",e.allTeachers),b.Eb(2),b.Ib("spinner",e.isLoading),b.qc("disabled",e.isLoading)}},directives:[r.g,r.d,d.b,g.c,c.k,p.c,f.c,g.b,p.o,p.g,f.a,r.c,h.b,g.a,c.l,v.a,g.d,S.n],styles:[""]}),t})();var y=i("kt0X"),q=i("wZkO"),R=i("lfTk"),T=i("+0xr");function O(t,e){1&t&&(b.Yb(0,"th",14),b.Mc(1," No. "),b.Xb())}function D(t,e){if(1&t&&(b.Yb(0,"td",15),b.Mc(1),b.Xb()),2&t){const t=e.$implicit;b.Eb(1),b.Oc(" ",t.position," ")}}function F(t,e){1&t&&(b.Yb(0,"th",14),b.Mc(1," PIB "),b.Xb())}function L(t,e){if(1&t&&(b.Yb(0,"p"),b.Mc(1),b.Xb()),2&t){const t=b.kc().$implicit;b.Eb(1),b.Oc(" ",t.pib," ")}}function j(t,e){1&t&&(b.Yb(0,"strong"),b.Mc(1,"[UNKNOWN]"),b.Xb())}function K(t,e){if(1&t&&(b.Yb(0,"td",15),b.Kc(1,L,2,1,"p",16),b.Kc(2,j,2,0,"strong",16),b.Xb()),2&t){const t=e.$implicit;b.Eb(1),b.qc("ngIf",t.pib),b.Eb(1),b.qc("ngIf",0==t.pib.trim().length)}}function N(t,e){1&t&&(b.Yb(0,"th",14),b.Mc(1," Actions "),b.Xb())}function $(t,e){if(1&t){const t=b.Zb();b.Yb(0,"td",15),b.Yb(1,"button",17),b.gc("click",(function(i){b.Dc(t);const c=e.$implicit;return b.kc(2).removeFromClass(c.id)})),b.Mc(2,"Remove from class"),b.Xb(),b.Xb()}}function A(t,e){1&t&&(b.Yb(0,"th",14),b.Mc(1," Control Work "),b.Xb())}function U(t,e){1&t&&b.Tb(0,"td",15)}function H(t,e){1&t&&b.Tb(0,"tr",18)}function x(t,e){1&t&&b.Tb(0,"tr",19)}function z(t,e){if(1&t){const t=b.Zb();b.Yb(0,"mat-tab",2),b.Yb(1,"div",3),b.Yb(2,"button",4),b.gc("click",(function(e){return b.Dc(t),b.kc().inviteStudent()})),b.Mc(3,"Invite a student"),b.Xb(),b.Yb(4,"button",4),b.gc("click",(function(e){return b.Dc(t),b.kc().editSubjects()})),b.Mc(5,"Edit subjects"),b.Xb(),b.Yb(6,"button",4),b.gc("click",(function(e){return b.Dc(t),b.kc().editTeachers()})),b.Mc(7,"Edit teachers"),b.Xb(),b.Tb(8,"br"),b.Tb(9,"app-group-chat"),b.Yb(10,"table",5),b.Wb(11,6),b.Kc(12,O,2,0,"th",7),b.Kc(13,D,2,1,"td",8),b.Vb(),b.Wb(14,9),b.Kc(15,F,2,0,"th",7),b.Kc(16,K,3,2,"td",8),b.Vb(),b.Wb(17,10),b.Kc(18,N,2,0,"th",7),b.Kc(19,$,3,0,"td",8),b.Vb(),b.Wb(20,11),b.Kc(21,A,2,0,"th",7),b.Kc(22,U,1,0,"td",8),b.Vb(),b.Kc(23,H,1,0,"tr",12),b.Kc(24,x,1,0,"tr",13),b.Xb(),b.Xb(),b.Xb()}if(2&t){const t=e.$implicit,i=b.kc();b.rc("label",t.name),b.Eb(9),b.Gb(t.id),b.Eb(1),b.qc("dataSource",i.dataSource),b.Eb(13),b.qc("matHeaderRowDef",i.displayedColumns)("matHeaderRowDefSticky",!0),b.Eb(1),b.qc("matRowDefColumns",i.displayedColumns)}}let P=(()=>{class t{constructor(t,e,i,c){this.dialog=t,this.store=e,this.admin=i,this.tools=c,this.displayedColumns=["position","PIB","Marks"],this.selectedClass=0,this.classes=[]}ngOnInit(){this.admin.getAllClasses().subscribe(t=>{this.classes=t,0!==t.length&&(this.selectedClass=t[0].id,this.store.dispatch(new a.c(t[0].id)),this.store.dispatch(new a.a(t[0].id)))}),this.store.select("teacher").subscribe(t=>{this.dataSource=t.students})}openDialog(t){this.dialog.open(o.a,{width:"90%",data:{id:t,classId:this.selectedClass}}).afterClosed()}inviteStudent(){this.dialog.open(m,{width:"90%",data:{classId:this.selectedClass}}).afterClosed().subscribe(t=>this.store.dispatch(new a.a(this.selectedClass)))}editSubjects(){this.dialog.open(Y,{width:"90%",data:{classId:this.selectedClass}}).afterClosed()}editTeachers(){this.dialog.open(M,{width:"90%",data:{classId:this.selectedClass}}).afterClosed()}removeFromClass(t){this.admin.removeStudentFromClass(t).subscribe(()=>{this.tools.showNotification("Student has been removed!"),this.store.dispatch(new a.a(this.selectedClass))})}onChange(t){console.log(t),this.selectedClass=this.classes[t].id,this.store.dispatch(new a.c(this.classes[t].id)),this.store.dispatch(new a.a(this.classes[t].id))}}return t.\u0275fac=function(e){return new(e||t)(b.Sb(r.b),b.Sb(y.h),b.Sb(n.a),b.Sb(l.a))},t.\u0275cmp=b.Mb({type:t,selectors:[["app-classes"]],decls:2,vars:1,consts:[["mat-align-tabs","center","animationDuration","2000ms",3,"selectedIndexChange"],[3,"label",4,"ngFor","ngForOf"],[3,"label"],[1,"container-fluid"],["mat-stroked-button","","color","accent",1,"cell-md-3","cell-12",2,"margin","1rem",3,"click"],["mat-table","",3,"dataSource"],["matColumnDef","position"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","PIB"],["matColumnDef","Marks"],["matColumnDef","ControlMark"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],["mat-cell",""],[4,"ngIf"],["mat-raised-button","","color","warn",2,"margin","1rem",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(b.Yb(0,"mat-tab-group",0),b.gc("selectedIndexChange",(function(t){return e.onChange(t)})),b.Kc(1,z,25,7,"mat-tab",1),b.Xb()),2&t&&(b.Eb(1),b.qc("ngForOf",e.classes))},directives:[q.b,c.k,q.a,h.b,R.a,T.j,T.c,T.e,T.b,T.g,T.i,T.d,T.a,c.l,T.f,T.h],styles:[""]}),t})();var V=i("M9IT");function W(t,e){1&t&&(b.Yb(0,"mat-icon",15),b.Mc(1,"cancel"),b.Xb())}function Z(t,e){if(1&t){const t=b.Zb();b.Yb(0,"mat-chip",13),b.gc("removed",(function(i){b.Dc(t);const c=e.$implicit;return b.kc().remove(c)})),b.Mc(1),b.Kc(2,W,2,0,"mat-icon",14),b.Xb()}if(2&t){const t=e.$implicit,i=b.kc();b.qc("selectable",i.selectable)("removable",i.removable),b.Eb(1),b.Oc(" ",t," "),b.Eb(1),b.qc("ngIf",i.removable)}}function _(t,e){if(1&t&&(b.Yb(0,"mat-option",16),b.Mc(1),b.Xb()),2&t){const t=e.$implicit;b.qc("value",t),b.Eb(1),b.Oc(" ",t," ")}}let B=(()=>{class t{constructor(t,e,i,c){this.tools=t,this.dialogRef=e,this.adminService=i,this.data=c,this.visible=!0,this.selectable=!0,this.removable=!0,this.fruitCtrl=new p.f,this.roles=[],this.allRoles=[],this.userEmail="",this.isLoading=!1,this.update()}ngOnInit(){}cancel(){this.dialogRef.close()}add(t){console.log(t),this.fruitCtrl.setValue(null)}remove(t){this.adminService.changeRolesInUser(this.data.uid,t).subscribe(()=>{this.tools.showNotification("Success"),this.update()})}selected(t){console.log(t),this.adminService.changeRolesInUser(this.data.uid,t.option.value).subscribe(()=>{this.tools.showNotification("Success"),this.update()})}update(){this.isLoading=!0,this.adminService.getAllRoles().subscribe(t=>{this.allRoles=t,this.adminService.getRolesByUID(this.data.uid).subscribe(t=>{this.roles=t,this.isLoading=!1,this.roles.forEach(t=>{this.allRoles.find(e=>e===t)&&(this.allRoles=this.allRoles.filter(e=>e!==t))})})})}close(){this.dialogRef.close()}}return t.\u0275fac=function(e){return new(e||t)(b.Sb(l.a),b.Sb(r.f),b.Sb(n.a),b.Sb(r.a))},t.\u0275cmp=b.Mb({type:t,selectors:[["app-change-roles"]],decls:15,vars:8,consts:[["mat-dialog-title",""],["mat-dialog-content",""],[1,"cell-12"],["aria-label","Roles selection"],["chipList",""],["color","accent",3,"selectable","removable","removed",4,"ngFor","ngForOf"],["placeholder","Roles",3,"formControl","matAutocomplete","matChipInputFor","matChipInputTokenEnd"],["fruitInput",""],[3,"optionSelected"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],["mat-dialog-actions",""],["mat-button","",3,"disabled","click"],["color","accent",3,"selectable","removable","removed"],["matChipRemove","",4,"ngIf"],["matChipRemove",""],[3,"value"]],template:function(t,e){if(1&t&&(b.Yb(0,"h1",0),b.Mc(1,"EDIT Roles"),b.Xb(),b.Yb(2,"div",1),b.Yb(3,"mat-form-field",2),b.Yb(4,"mat-chip-list",3,4),b.Kc(6,Z,3,4,"mat-chip",5),b.Yb(7,"input",6,7),b.gc("matChipInputTokenEnd",(function(t){return e.add(t)})),b.Xb(),b.Xb(),b.Yb(9,"mat-autocomplete",8,9),b.gc("optionSelected",(function(t){return e.selected(t)})),b.Kc(11,_,2,2,"mat-option",10),b.Xb(),b.Xb(),b.Xb(),b.Yb(12,"div",11),b.Yb(13,"button",12),b.gc("click",(function(t){return e.close()})),b.Mc(14,"Close"),b.Xb(),b.Xb()),2&t){const t=b.zc(5),i=b.zc(10);b.Eb(6),b.qc("ngForOf",e.roles),b.Eb(1),b.qc("formControl",e.fruitCtrl)("matAutocomplete",i)("matChipInputFor",t),b.Eb(4),b.qc("ngForOf",e.allRoles),b.Eb(2),b.Ib("spinner",e.isLoading),b.qc("disabled",e.isLoading)}},directives:[r.g,r.d,d.b,g.c,c.k,p.c,f.c,g.b,p.o,p.g,f.a,r.c,h.b,g.a,c.l,v.a,g.d,S.n],styles:[""]}),t})();function G(t,e){1&t&&(b.Yb(0,"mat-icon",15),b.Mc(1,"cancel"),b.Xb())}function J(t,e){if(1&t){const t=b.Zb();b.Yb(0,"mat-chip",13),b.gc("removed",(function(i){b.Dc(t);const c=e.$implicit;return b.kc().remove(c)})),b.Mc(1),b.Kc(2,G,2,0,"mat-icon",14),b.Xb()}if(2&t){const t=e.$implicit,i=b.kc();b.qc("selectable",i.selectable)("removable",i.removable),b.Eb(1),b.Oc(" ",t.name," "),b.Eb(1),b.qc("ngIf",i.removable)}}function Q(t,e){if(1&t&&(b.Yb(0,"mat-option",16),b.Mc(1),b.Xb()),2&t){const t=e.$implicit;b.qc("value",t),b.Eb(1),b.Oc(" ",t.name," ")}}let tt=(()=>{class t{constructor(t,e,i,c){this.tools=t,this.dialogRef=e,this.adminService=i,this.data=c,this.visible=!0,this.selectable=!0,this.removable=!0,this.fruitCtrl=new p.f,this.subjects=[],this.allSubjects=[],this.userEmail="",this.isLoading=!1,this.update()}ngOnInit(){}cancel(){this.dialogRef.close()}add(t){console.log(t),this.fruitCtrl.setValue(null)}remove(t){this.adminService.editSubjectsInTeacher(this.data.teacherId,t.id).subscribe(()=>{this.tools.showNotification("Success"),this.update()})}selected(t){console.log(t),this.adminService.editSubjectsInTeacher(this.data.teacherId,t.option.value.id).subscribe(()=>{this.tools.showNotification("Success"),this.update()})}update(){this.isLoading=!0,this.adminService.getAllSubjects().subscribe(t=>{this.allSubjects=t,this.adminService.getTeacherSubjects(this.data.teacherId).subscribe(t=>{this.subjects=t,this.isLoading=!1,this.subjects.forEach(t=>{this.allSubjects.find(e=>e.id===t.id)&&(this.allSubjects=this.allSubjects.filter(e=>e.id!==t.id))})})})}close(){this.dialogRef.close()}}return t.\u0275fac=function(e){return new(e||t)(b.Sb(l.a),b.Sb(r.f),b.Sb(n.a),b.Sb(r.a))},t.\u0275cmp=b.Mb({type:t,selectors:[["app-edit-subjects-in-teacher"]],decls:15,vars:8,consts:[["mat-dialog-title",""],["mat-dialog-content",""],[1,"cell-12"],["aria-label","Subjects selection"],["chipList",""],["color","accent",3,"selectable","removable","removed",4,"ngFor","ngForOf"],["placeholder","Subjects",3,"formControl","matAutocomplete","matChipInputFor","matChipInputTokenEnd"],["fruitInput",""],[3,"optionSelected"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],["mat-dialog-actions",""],["mat-button","",3,"disabled","click"],["color","accent",3,"selectable","removable","removed"],["matChipRemove","",4,"ngIf"],["matChipRemove",""],[3,"value"]],template:function(t,e){if(1&t&&(b.Yb(0,"h1",0),b.Mc(1,"EDIT SUBJECTS"),b.Xb(),b.Yb(2,"div",1),b.Yb(3,"mat-form-field",2),b.Yb(4,"mat-chip-list",3,4),b.Kc(6,J,3,4,"mat-chip",5),b.Yb(7,"input",6,7),b.gc("matChipInputTokenEnd",(function(t){return e.add(t)})),b.Xb(),b.Xb(),b.Yb(9,"mat-autocomplete",8,9),b.gc("optionSelected",(function(t){return e.selected(t)})),b.Kc(11,Q,2,2,"mat-option",10),b.Xb(),b.Xb(),b.Xb(),b.Yb(12,"div",11),b.Yb(13,"button",12),b.gc("click",(function(t){return e.close()})),b.Mc(14,"Close"),b.Xb(),b.Xb()),2&t){const t=b.zc(5),i=b.zc(10);b.Eb(6),b.qc("ngForOf",e.subjects),b.Eb(1),b.qc("formControl",e.fruitCtrl)("matAutocomplete",i)("matChipInputFor",t),b.Eb(4),b.qc("ngForOf",e.allSubjects),b.Eb(2),b.Ib("spinner",e.isLoading),b.qc("disabled",e.isLoading)}},directives:[r.g,r.d,d.b,g.c,c.k,p.c,f.c,g.b,p.o,p.g,f.a,r.c,h.b,g.a,c.l,v.a,g.d,S.n],styles:[""]}),t})();var et=i("ey9i"),it=i("d3UM");function ct(t,e){if(1&t&&(b.Yb(0,"mat-option",7),b.Mc(1),b.Xb()),2&t){const t=e.$implicit;b.qc("value",t.id),b.Eb(1),b.Oc(" ",t.name," ")}}let st=(()=>{class t{constructor(t,e,i,c){this.tools=t,this.dialogRef=e,this.adminService=i,this.data=c,this.classes=[],this.selectedClass="",this.userEmail="",this.isLoading=!1,this.update()}ngOnInit(){}cancel(){this.dialogRef.close()}selected(t){console.log(t),this.adminService.changeRolesInUser(this.data.uid,t.option.value).subscribe(()=>{this.tools.showNotification("Success"),this.update()})}onChange(t){this.isLoading=!0,this.adminService.changeClassInStudent(t.value,this.data.uid).subscribe(()=>{this.isLoading=!1,this.tools.showNotification("Success")},()=>{this.isLoading=!1})}update(){this.isLoading=!0,this.adminService.getStudentClasses(this.data.uid).subscribe(t=>{this.classes=t,-1!==this.classes.findIndex(t=>!0===t.active)&&(this.selectedClass=this.classes.find(t=>!0===t.active).id),this.isLoading=!1},()=>{this.isLoading=!1})}close(){this.dialogRef.close()}}return t.\u0275fac=function(e){return new(e||t)(b.Sb(l.a),b.Sb(r.f),b.Sb(n.a),b.Sb(r.a))},t.\u0275cmp=b.Mb({type:t,selectors:[["app-change-class-in-student"]],decls:11,vars:5,consts:[["mat-dialog-title",""],["mat-dialog-content",""],[1,"cell-12"],[3,"ngModel","ngModelChange","selectionChange"],[3,"value",4,"ngFor","ngForOf"],["mat-dialog-actions",""],["mat-button","",3,"disabled","click"],[3,"value"]],template:function(t,e){1&t&&(b.Yb(0,"h1",0),b.Mc(1,"Change a class"),b.Xb(),b.Yb(2,"div",1),b.Yb(3,"mat-form-field",2),b.Yb(4,"mat-label"),b.Mc(5,"Change a class"),b.Xb(),b.Yb(6,"mat-select",3),b.gc("ngModelChange",(function(t){return e.selectedClass=t}))("selectionChange",(function(t){return e.onChange(t)})),b.Kc(7,ct,2,2,"mat-option",4),b.Xb(),b.Xb(),b.Xb(),b.Yb(8,"div",5),b.Yb(9,"button",6),b.gc("click",(function(t){return e.close()})),b.Mc(10,"Close"),b.Xb(),b.Xb()),2&t&&(b.Eb(6),b.qc("ngModel",e.selectedClass),b.Eb(1),b.qc("ngForOf",e.classes),b.Eb(2),b.Ib("spinner",e.isLoading),b.qc("disabled",e.isLoading))},directives:[r.g,r.d,d.b,d.f,it.a,p.o,p.r,c.k,r.c,h.b,S.n],styles:[""]}),t})();var at=i("f0Cb"),ot=i("Dh3D");function nt(t,e){1&t&&(b.Yb(0,"th",13),b.Mc(1," PIB "),b.Xb())}function lt(t,e){if(1&t&&(b.Yb(0,"p"),b.Mc(1),b.Xb()),2&t){const t=b.kc().$implicit;b.Eb(1),b.Oc(" ",t.pib," ")}}function rt(t,e){if(1&t&&(b.Yb(0,"p",17),b.Mc(1),b.Xb()),2&t){const t=b.kc().$implicit;b.Eb(1),b.Oc(" ",t.pib," ")}}function bt(t,e){1&t&&(b.Yb(0,"strong"),b.Mc(1,"[UNKNOWN]"),b.Xb())}function dt(t,e){if(1&t&&(b.Yb(0,"td",14),b.Kc(1,lt,2,1,"p",15),b.Kc(2,rt,2,1,"p",16),b.Kc(3,bt,2,0,"strong",15),b.Xb()),2&t){const t=e.$implicit,i=b.kc();b.Eb(1),b.qc("ngIf",t.pib&&t.id!==i.myUID),b.Eb(1),b.qc("ngIf",t.pib&&t.id===i.myUID),b.Eb(1),b.qc("ngIf",0==t.pib.trim().length)}}function ut(t,e){1&t&&(b.Yb(0,"th",13),b.Mc(1," Roles "),b.Xb())}function ht(t,e){if(1&t){const t=b.Zb();b.Yb(0,"button",20),b.gc("click",(function(e){b.Dc(t);const i=b.kc().$implicit;return b.kc().editSubjects(i.id)})),b.Mc(1,"Edit subjects"),b.Xb()}}function mt(t,e){if(1&t){const t=b.Zb();b.Yb(0,"button",20),b.gc("click",(function(e){b.Dc(t);const i=b.kc().$implicit;return b.kc().editClass(i.id)})),b.Mc(1,"Change a class"),b.Xb()}}function pt(t,e){if(1&t){const t=b.Zb();b.Yb(0,"td",14),b.Yb(1,"button",18),b.gc("click",(function(i){b.Dc(t);const c=e.$implicit;return b.kc().onRoles(c.id)})),b.Mc(2,"Roles"),b.Xb(),b.Kc(3,ht,2,0,"button",19),b.Kc(4,mt,2,0,"button",19),b.Xb()}if(2&t){const t=e.$implicit;b.Eb(3),b.qc("ngIf",t.isTeacher),b.Eb(1),b.qc("ngIf",t.isStudent)}}function gt(t,e){1&t&&b.Tb(0,"tr",21)}function ft(t,e){1&t&&b.Tb(0,"tr",22)}const vt=function(){return[5,10,25,100]};let St=(()=>{class t{constructor(t,e,i){this.dialog=t,this.adminService=e,this.authService=i,this.displayedColumns=["pib","roles"],this.pageSize=10,this.pageIndex=0,this.myUID=""}LoadUsers(){this.adminService.getAllUsers(1,999).subscribe(t=>{this.dataSource=new T.k(t.data),this.dataSource.paginator=this.paginator})}ngOnInit(){this.LoadUsers(),this.myUID=this.authService.getUserId()}onRoles(t){this.dialog.open(B,{width:"90%",data:{uid:t}}).afterClosed().subscribe(()=>{this.LoadUsers()})}addUser(){this.dialog.open(m,{width:"90%",data:{classId:0}}).afterClosed().subscribe(()=>{this.adminService.getAllUsers(1,999).subscribe(t=>{this.dataSource=new T.k(t.data),this.dataSource.paginator=this.paginator})})}applyFilter(t){this.dataSource.filter=t.target.value.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}editClass(t){this.dialog.open(st,{width:"90%",data:{uid:t}}).afterClosed()}editSubjects(t){this.dialog.open(tt,{width:"90%",data:{teacherId:t}}).afterClosed()}}return t.\u0275fac=function(e){return new(e||t)(b.Sb(r.b),b.Sb(n.a),b.Sb(et.c))},t.\u0275cmp=b.Mb({type:t,selectors:[["app-users"]],viewQuery:function(t,e){var i;1&t&&b.Ic(V.a,!0),2&t&&b.yc(i=b.hc())&&(e.paginator=i.first)},decls:22,vars:7,consts:[[1,"container-fluid"],["mat-raised-button","","color","primary",3,"click"],[1,"cell-12"],["matInput","","placeholder","Filter...",1,"cell-12",3,"keyup"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","pib"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","roles"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"pageSize","pageIndex","pageSizeOptions"],["paginator",""],["mat-header-cell",""],["mat-cell",""],[4,"ngIf"],["style","color: darkred;",4,"ngIf"],[2,"color","darkred"],["mat-raised-button","","color","accent",2,"margin-right","1rem",3,"click"],["mat-raised-button","","color","primary","style","margin-right: 1rem",3,"click",4,"ngIf"],["mat-raised-button","","color","primary",2,"margin-right","1rem",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(b.Yb(0,"div",0),b.Yb(1,"button",1),b.gc("click",(function(t){return e.addUser()})),b.Mc(2," Add an user"),b.Xb(),b.Tb(3,"br"),b.Tb(4,"mat-divider"),b.Tb(5,"br"),b.Yb(6,"mat-form-field",2),b.Yb(7,"mat-label"),b.Mc(8,"Filter"),b.Xb(),b.Yb(9,"input",3),b.gc("keyup",(function(t){return e.applyFilter(t)})),b.Xb(),b.Xb(),b.Tb(10,"br"),b.Yb(11,"table",4),b.Wb(12,5),b.Kc(13,nt,2,0,"th",6),b.Kc(14,dt,4,3,"td",7),b.Vb(),b.Wb(15,8),b.Kc(16,ut,2,0,"th",6),b.Kc(17,pt,5,2,"td",7),b.Vb(),b.Kc(18,gt,1,0,"tr",9),b.Kc(19,ft,1,0,"tr",10),b.Xb(),b.Tb(20,"mat-paginator",11,12),b.Xb()),2&t&&(b.Eb(11),b.qc("dataSource",e.dataSource),b.Eb(7),b.qc("matHeaderRowDef",e.displayedColumns),b.Eb(1),b.qc("matRowDefColumns",e.displayedColumns),b.Eb(1),b.qc("pageSize",e.pageSize)("pageIndex",e.pageIndex)("pageSizeOptions",b.sc(6,vt)))},directives:[h.b,at.a,d.b,d.f,u.b,T.j,ot.a,T.c,T.e,T.b,T.g,T.i,V.a,T.d,T.a,c.l,T.f,T.h],styles:[""]}),t})();var Ct=i("Gpoy"),It=i("Wp6s"),Xt=i("MutI");function Yt(t,e){if(1&t){const t=b.Zb();b.Yb(0,"b",16),b.gc("click",(function(e){b.Dc(t);const i=b.kc().$implicit;return b.kc().saveCommand(i.message)})),b.Mc(1),b.Xb()}if(2&t){const t=b.kc().$implicit;b.Eb(1),b.Nc(t.message)}}function kt(t,e){if(1&t&&(b.Yb(0,"b",17),b.Mc(1),b.Xb()),2&t){const t=b.kc().$implicit;b.Eb(1),b.Nc(t.message)}}function Et(t,e){if(1&t&&(b.Yb(0,"mat-list-item",9),b.Yb(1,"h3",10),b.Yb(2,"b"),b.Mc(3),b.Xb(),b.Mc(4,": "),b.Yb(5,"span",11),b.Mc(6),b.Xb(),b.Xb(),b.Yb(7,"div",12),b.Yb(8,"div",13),b.Kc(9,Yt,2,1,"b",14),b.Kc(10,kt,2,1,"b",15),b.Xb(),b.Xb(),b.Xb()),2&t){const t=e.$implicit;b.Eb(2),b.Jc("color",t.color),b.Eb(1),b.Nc(t.senderPib),b.Eb(3),b.Nc(t.date),b.Eb(3),b.qc("ngIf","/"===t.message[0]),b.Eb(1),b.qc("ngIf","/"!==t.message[0])}}const wt=[{path:"classes",component:P},{path:"users",component:St},{path:"console",component:(()=>{class t{constructor(t,e){this.tools=t,this.authService=e,this.messages=[],this.message="/help",this.isLoading=!1}ngOnInit(){this.connect()}connect(){this._hubConnection=(new Ct.b).withUrl(et.a+"/api/hubs/console",{transport:Ct.a.WebSockets,accessTokenFactory:()=>window.localStorage.getItem(et.e)}).build(),this._hubConnection.start().then(()=>{this.Send(),this.tools.showNotification("Connected to @console")}).catch(t=>{this.tools.showNotification("Error while starting connection"),console.log("Error while starting connection: "+t)}),this._hubConnection.on("reciveCmd",t=>{this.messages.push(t),this.goDown()})}Send(){this._hubConnection.invoke("Execute",this.message).catch(t=>this.Handler(t)),this.message=""}goDown(){const t=document.querySelector(".chat");setTimeout(()=>{t.scrollTop=t.scrollHeight},0)}saveCommand(t){this.message=t.split(" ")[0]}Handler(t){-1!==t.message.toString().indexOf("because user is unauthorized")&&(this._hubConnection.stop(),this.authService.Refresh().subscribe(()=>{this.connect()}))}Clear(){this.messages=[]}Help(){this._hubConnection.invoke("Execute","/help").catch(t=>this.Handler(t)),this.isLoading=!0,setTimeout(()=>{this.isLoading=!1},5e3)}}return t.\u0275fac=function(e){return new(e||t)(b.Sb(l.a),b.Sb(et.c))},t.\u0275cmp=b.Mb({type:t,selectors:[["app-console"]],decls:18,vars:5,consts:[[1,"cell-md-12","cell-12"],[1,"chat"],["tdMediaToggle","gt-xs"],["class","pad-top pad-bottom",4,"ngFor","ngForOf"],["layout","row","layout-align","start center"],["flex","","layout","row","floatPlaceholder","never",2,"width","100%"],["matInput","","placeholder","message",2,"width","100%",3,"ngModel","ngModelChange"],["type","submit","color","primary","mat-raised-button","","mat-button","",3,"disabled","click"],["type","submit","color","primary","mat-raised-button","","mat-button","",2,"margin-left","1rem",3,"disabled","click"],[1,"pad-top","pad-bottom"],["matLine","",1,"cursor-pointer"],[1,"tc-grey-500","md-caption"],["matLine",""],[1,"text-wrap",2,"word-wrap","break-word"],["style","padding-left: 1rem; cursor: pointer;",3,"click",4,"ngIf"],["style","padding-left: 1rem;",4,"ngIf"],[2,"padding-left","1rem","cursor","pointer",3,"click"],[2,"padding-left","1rem"]],template:function(t,e){1&t&&(b.Yb(0,"div",0),b.Yb(1,"div",1),b.Yb(2,"mat-card",2),b.Yb(3,"mat-card-subtitle"),b.Mc(4,"Console"),b.Xb(),b.Yb(5,"mat-list"),b.Kc(6,Et,11,6,"mat-list-item",3),b.Xb(),b.Xb(),b.Xb(),b.Tb(7,"mat-divider"),b.Yb(8,"mat-card"),b.Yb(9,"div",4),b.Yb(10,"mat-form-field",5),b.Yb(11,"textarea",6),b.gc("ngModelChange",(function(t){return e.message=t})),b.Xb(),b.Xb(),b.Yb(12,"button",7),b.gc("click",(function(t){return e.Send()})),b.Mc(13,"Send"),b.Xb(),b.Yb(14,"button",8),b.gc("click",(function(t){return e.Help()})),b.Mc(15,"Help"),b.Xb(),b.Yb(16,"button",8),b.gc("click",(function(t){return e.Clear()})),b.Mc(17,"Clear"),b.Xb(),b.Xb(),b.Xb(),b.Xb()),2&t&&(b.Eb(6),b.qc("ngForOf",e.messages),b.Eb(5),b.qc("ngModel",e.message),b.Eb(1),b.qc("disabled",0==e.message.length),b.Eb(2),b.qc("disabled",e.isLoading),b.Eb(2),b.qc("disabled",0===e.messages.length))},directives:[It.a,It.e,Xt.a,c.k,at.a,d.b,u.b,p.c,p.o,p.r,h.b,Xt.d,S.j,c.l],styles:[".chat[_ngcontent-%COMP%]{height:555px;overflow-y:scroll;overflow-wrap:inherit}.mat-option.mat-selected[_ngcontent-%COMP%]{background:red!important}.mat-option.mat-active[_ngcontent-%COMP%]{background:#00f!important}mat-list-option[aria-selected=true][_ngcontent-%COMP%]{background:rgba(0,139,139,.7)}.mat-pseudo-checkbox[_ngcontent-%COMP%]{display:none!important;visibility:hidden!important}"]}),t})()}];let Mt=(()=>{class t{}return t.\u0275mod=b.Qb({type:t}),t.\u0275inj=b.Pb({factory:function(e){return new(e||t)},imports:[[s.i.forChild(wt)],s.i]}),t})();var yt=i("M0ag");i.d(e,"AdminModule",(function(){return qt}));let qt=(()=>{class t{}return t.\u0275mod=b.Qb({type:t}),t.\u0275inj=b.Pb({factory:function(e){return new(e||t)},imports:[[c.c,Mt,yt.a]]}),t})()}}]);