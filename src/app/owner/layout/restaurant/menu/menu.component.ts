import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RestaurantService } from '../../../../shared/services/restaurant.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as Swaldata from '../../../../shared/helpers/swalFunctionsData';
import { noOnlyWhitespaceValidator } from "../../../../shared/helpers/custom.validator";
import { dataURLtoFile, dropdownsetting, cleanForm } from "../../../../shared/helpers/commonFunctions";
import * as Excel from 'exceljs/dist/exceljs.min.js';
declare var $: JQueryStatic;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: ['.btn-div{padding:10px}', '.detailcard .menus{border-top: 1px solid #e8e0e0;}', '.detailcard .menus:first-child {border-top: none !important;}', 'angular2-multiselect .dropdown-list {display:content}', '.menu-row-del{position:absolute;top :-10px; left:0px; margin: 12px 5px;}', '.menu-row{padding:0px 12px; }', '.upload-btn-wrapper {position: relative;overflow: hidden;display: inline-block;}', '.cus-btn {border: 2px solid #fdbd34;color: #ffffff;background-color: #fdbd34;padding: 0px 10px;border-radius: 0.25rem;font-size: 17px;cursor: pointer;}'],
  styleUrls: ['../restaurant.component.scss']
})

//, '.upload-btn-wrapper input[type=file] {font-size: 100px;position: absolute;left: 0;top: 0;opacity: 0;}'
export class MenuComponent implements OnInit {
  public UserhasRestaurant: boolean = false;
  public restaurantId: number;
  public groupList = [];
  public items = [];
  public groupID: Number = -1;
  public showItempic = [];
  public itemImagePath = environment.fileurl + '/';

  public showaddedit: boolean = true;
  public ShowDetail: boolean = false;
  public showcoustmization: boolean = false

  public detailGroupName: string = "";
  public detailGroupMenuitems: Array<string> = [];


  public groupForm: FormGroup;
  public customizationGroup: FormGroup;
  public selectedItemCus = []
  public customizationslist: Array<any> = [];
  public dropdownSettings = {
    singleSelection: false,
    text: "Select Customization",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class",

  };
  public groupCustomizationOption: any;
  useOtherResmenu: boolean = false;
  RestaurantList: Array<any> = [];
  selectedRes: Number = -1

  openTimeForm: FormGroup;
  openTimeFormvalue: any = null

  @ViewChild('excelInput', { static: false }) excelInput: ElementRef;
  @ViewChild('quaexcelInput', { static: false }) quaexcelInput: ElementRef;


  constructor(private route: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private RestaurantService: RestaurantService) { }

  getResGroup() {
    //get menu group list 
    this.RestaurantService.getgroupsofMenu(this.restaurantId).subscribe(
      data => {
        if (data.status == 200) {
          this.groupList = data.data;
          this.UserhasRestaurant = true;
        } else {
          this.UserhasRestaurant = false;
          Swal.fire(Swaldata.SwalErrorToast(data.msg));
        }

      }, error => {
        Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
        this._router.navigate(['/owner/restaurants/list']);

      }
    ).add(() => {
      this.spinner.hide();
    });
  }
  ngOnInit() {
    this.spinner.show();
    //get restaurant id 
    this.restaurantId = parseInt(this.route.snapshot.paramMap.get("id"));

    this.getResGroup();

    this.groupForm = this.formBuilder.group(
      {
        'groupname': ["", [Validators.required, noOnlyWhitespaceValidator]],
        'items': this.formBuilder.array([this.createMenuItemGroup()], [Validators.required]),

      }
    );

    this.customizationGroup = this.formBuilder.group({
      customize_id: [-1],
      name: ["", [Validators.required, noOnlyWhitespaceValidator]],
      max: [""],
      // type: [0, Validators.required],
      options: this.formBuilder.array([this.createOptions()], [Validators.required])
    })

    this.openTimeForm = this.formBuilder.group({
      monopen_time: [''],
      monclose_time: [''],
      tueopen_time: [''],
      tueclose_time: [''],
      wedopen_time: [''],
      wedclose_time: [''],
      thuopen_time: [''],
      thuclose_time: [''],
      friopen_time: [''],
      friclose_time: [''],
      satopen_time: [''],
      satclose_time: [''],
      sunopen_time: [''],
      sunclose_time: [''],
    })


  }

  createOptions() {
    return this.formBuilder.group({
      itemid: [null],
      option_name: ['', [Validators.required, noOnlyWhitespaceValidator]],
      option_price: ['', [Validators.required]]
    })
  }

  createOptionsEdit(data) {
    return this.formBuilder.group({
      itemid: [data.id],
      option_name: [data.option_name, [Validators.required, noOnlyWhitespaceValidator]],
      option_price: [data.option_price, [Validators.required]]
    })
  }

  createMenuItemGroup() {
    return this.formBuilder.group({
      item_id: [null],
      name: ['', [Validators.required, noOnlyWhitespaceValidator]],
      price: ['', [Validators.required]],
      itempic: [null],
      pic: [],
      cus: [''],
      taxtype: ['', [Validators.required]],
      quantity: ['', [Validators.pattern('^[0-9]*[1-9][0-9]*$')]],
      upc_no: ['', []],
      item_des: ['', []],
      is_show: [false, []],
      is_food: [false, []],
      is_state: [false, []],
      is_city: [false, []],
      is_note: [false, []],
    })
  }

  createMenuItemGroupbyEdit(data) {
    console.log("data: ", data)
    let isShow = false
    if (data.is_show == 1 || data.is_show == null) {
      isShow = true
    }
    return this.formBuilder.group({
      item_id: [data.id],
      name: [data.item_name, [Validators.required]],
      price: [data.item_price, [Validators.required]],
      itempic: [data.item_pic],
      pic: [],
      cus: [],
      taxtype: [data.taxtype, [Validators.required]],
      quantity: [data.item_quantity, [Validators.pattern('^[0-9]*[1-9][0-9]*$')]],
      upc_no: [data.upc_no, []],
      item_des: [data.item_des, []],
      is_show: [isShow, []],
      is_food: [data.is_food, []],
      is_state: [data.is_state, []],
      is_city: [data.is_city, []],
      is_note: [data.is_note, []]
    })

  }
  get Items(): FormArray {
    return this.groupForm.get('items') as FormArray;
  }

  get Options(): FormArray {
    return this.customizationGroup.get('options') as FormArray;
  }

  addOptions() {
    let fg = this.createOptions();
    this.Options.push(fg);

  }


  addItems() {
    let fg = this.createMenuItemGroup();
    this.Items.push(fg);

  }

  deleteItem(idx: number) {
    if (this.Items.value.length > 1) {
      delete this.showItempic[idx];
      this.showItempic.forEach((element, index) => {
        if (index > idx) {
          this.showItempic[index - 1] = element;
          delete this.showItempic[index];
        }
      });
      this.Items.removeAt(idx);
    }
  }

  deleteCustomizeOption(idx: number) {
    if (this.Options.value.length > 1) {
      this.Options.removeAt(idx);
    }
  }


  editsec() {
    this.ShowDetail = false;
    this.showcoustmization = false;
    this.showaddedit = true;
  }

  detailsec() {
    this.ShowDetail = true;
    this.showcoustmization = false;
    this.showaddedit = false;
  }

  customizesec() {
    this.ShowDetail = false;
    this.showcoustmization = true;
    this.showaddedit = false;
  }

  addgroup() {
    this.editsec()
    this.groupID = -1;
    this.resetForm();
    this.addItems();

  }
  resetForm() {
    this.showItempic = [];
    this.groupForm.reset();
    this.Items.clear();
    this.groupCustomizationOption = []
  }
  resetCoustomizationForm() {
    this.customizationGroup.reset()
    this.Options.clear()
  }

  UploadExcel(e) {
    let validExts = new Array(".xlsx");

    if (e.target.files[0].length < 1)
      return

    let filename = e.target.files[0].name;
    let fileext = filename.substring(filename.lastIndexOf('.'));

    if (validExts.indexOf(fileext) < 0) {
      Swal.fire(Swaldata.SwalErrorToast(`Invalid file selected, valid files are of  ${validExts.toString()} types.`))
      return false;
    }

    Swal.fire(Swaldata.SwalConfirm("Excel data will updated")).then(async (result) => {
      if (result.value) {
        await this.readExcel(e).then(r => {
          this.spinner.show()
          this.RestaurantService.uploadmenu({ result: r, res_id: this.restaurantId, loggedInUser_Id: localStorage.getItem('currentUserId') }).subscribe(data => {
            if (data.status)
              Swal.fire(Swaldata.SwalSuccessToast(data.msg))
            else
              Swal.fire(Swaldata.SwalErrorToast(data.msg))
          }, err => {
            Swal.fire(Swaldata.SwalErrorToast(err))
          }
          ).add(() => {
            this.excelInput.nativeElement.value = null
            this.spinner.hide();
            this.getResGroup();
          });
        })
      } else {
        this.excelInput.nativeElement.value = null
      }
    })

  }

  editGroup(id) {
    this.editsec()
    if (id < 1)
      return;
    this.spinner.show();
    this.groupID = id;
    this.resetForm();
    //get group detail and its list;
    this.RestaurantService.getGroup(this.restaurantId, this.groupID).subscribe(
      data => {
        console.log("getGroup: ", data)

        if (data.status == 200) {
          this.openTimeForm.patchValue({
            monopen_time: data.group.monopen_time,
            monclose_time: data.group.monclose_time,
            tueopen_time: data.group.tueopen_time,
            tueclose_time: data.group.tueclose_time,
            wedopen_time: data.group.wedopen_time,
            wedclose_time: data.group.wedclose_time,
            thuopen_time: data.group.thuopen_time,
            thuclose_time: data.group.thuclose_time,
            friopen_time: data.group.friopen_time,
            friclose_time: data.group.friclose_time,
            satopen_time: data.group.satopen_time,
            satclose_time: data.group.satclose_time,
            sunopen_time: data.group.sunopen_time,
            sunclose_time: data.group.sunclose_time,
          })
          this.selectedItemCus = []
          this.groupID = data.group.id;
          this.groupForm.patchValue({
            groupname: data.group.group_name
          });

          this.groupCustomizationOption = []

          data.cus.forEach(ele => {
            this.groupCustomizationOption.push({ id: ele.id, itemName: ele.name });
          })


          data.menuitems.forEach((element, index) => {
            if (element.item_pic != "null" && element.item_pic)
              this.showItempic[index] = this.itemImagePath + element.item_pic;
            let fg = this.createMenuItemGroupbyEdit(element);
            this.Items.push(fg);

            if (element.customizations && element.customizations != 'null') {
              let temp = []
              element.customizations.split(',').forEach(ele => {
                temp.push({ id: parseInt(ele), itemName: this.getCusName(ele) })
              })
              this.selectedItemCus.push(temp)
            }
            else
              this.selectedItemCus.push([])
          });

        } else {
          Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
        }
      },
      error => {
        Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
      }
    ).add(() => {
      this.spinner.hide();
    });

  }

  deleteallmenu() {
    //confirm to remove group
    Swal.fire(Swaldata.SwalConfirm("All Groups and their data will deleted")).then((result) => {
      if (result.value) {
        this.spinner.show()
        this.RestaurantService.deleteallmenu(this.restaurantId).subscribe(
          data => {
            if (data.status) {
              Swal.fire(Swaldata.SwalSuccessToast(data.msg))
            } else {
              Swal.fire(Swaldata.SwalErrorToast(data.msg))
            }
          }, err => {
            Swal.fire(Swaldata.SwalErrorToast(err))
          }
        ).add(() => {
          this.spinner.hide()
          this.getResGroup()
        })
      }
    })
  }

  getCusName(id) {
    let name = "";
    this.groupCustomizationOption.forEach(ele => {

      if (ele.id == id)
        name = ele.itemName
    })
    return name
  }

  fileChangeEvent(event, control_id) {
    this.groupForm.value.items[control_id].itempic = event.target.files[0];
    var reader = new FileReader();

    reader.onload = (e: any) => this.showItempic[control_id] = e.target.result;

    reader.readAsDataURL(event.target.files[0]);
  }

  onSubmit() {
    if (!this.groupForm.valid)
      return

    this.spinner.show();

    let formValue = this.groupForm.value;
    formValue["resid"] = this.restaurantId;
    formValue["groupId"] = this.groupID;

    let formData = new FormData();
    Object.entries(this.openTimeFormvalue).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
      }
    )
    console.log("openTimeFormvalue: ", this.openTimeFormvalue)
    Object.entries(formValue).forEach(
      ([key, value]: any[], index) => {
        if (key == "items") {
          value.map((itemkey, itemvalue) => {
            console.log("itemKey: ", itemkey)
            console.log("itemvalue: ", itemvalue)
            itemkey.name = itemkey.name.trim();
            if (!itemkey.cus || itemkey.cus == null || itemkey.cus.length < 1) {
              itemkey.cus = null
            } else {
              let temp = []
              itemkey.cus.forEach(ele => {
                temp.push(ele.id)
              })
              itemkey.cus = temp.join()
            }
            itemkey.quantity = (itemkey.quantity != null && itemkey.quantity != 'null' && itemkey.quantity != '') ? itemkey.quantity : null
            if (itemkey.is_show) {
              itemkey.is_show = 1
            } else {
              itemkey.is_show = 0
            }
            if (itemkey.is_food) {
              itemkey.is_food = 1
            } else {
              itemkey.is_food = 0
            }
            if (itemkey.is_state) {
              itemkey.is_state = 1
            } else {
              itemkey.is_state = 0
            }
            if (itemkey.is_city) {
              itemkey.is_city = 1
            } else {
              itemkey.is_city = 0
            }
            if (itemkey.is_note) {
              itemkey.is_note = 1
            } else {
              itemkey.is_note = 0
            }
          })
          formData.set(key, JSON.stringify(value));
          console.log("value: ", value)
          console.log("formData: ", formData)
        } else {
          (typeof value == 'string') ? formData.set(key, value.trim()) : formData.set(key, value)
        }
      }
    );

    this.groupForm.value.items.forEach((element, index) => {
      if (element.itempic != null)
        formData.set('itemPic_' + index, element.itempic);
    });


    //this.RestaurantService.createGroup(formData).subscribe(
    this.RestaurantService.createGroup(formData).subscribe(
      data => {
        console.log("datares: ", data)
        if (data.status == 200) {
          this.addgroup();
          if (this.groupID == -1)
            this.groupList = data.groups;
          Swal.fire(Swaldata.SwalSuccessToast("Sucessfully inserted"));
        } else {
          Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
        }
      },
      error => {
        Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
      }
    ).add(() => {
      this.spinner.hide();
    })

  }

  deleteGroupbymenu(id) {
    // this.groupID = id;
    this.deleteGroup(id);
  }

  deleteGroup(gid) {
    // if (gid != this.groupID)
    //   return;

    //confirm to remove group
    Swal.fire(Swaldata.SwalConfirm("All Group data will deleted")).then((result) => {
      if (result.value && !isNaN(gid)) {
        //delete group here 
        this.spinner.show();
        this.RestaurantService.deletegroup(this.restaurantId, gid).subscribe(
          data => {
            if (data.status == 200) {
              this.addgroup();
              this.groupList = data.groups;
              Swal.fire(Swaldata.SwalSuccessToast('Group delete succefully'));
            } else
              Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
          },
          error => {
            Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
          }
        ).add(() => {
          this.spinner.hide();
        })
      }
    })
  }

  detailGroup(gid) {
    this.detailsec()
    this.groupID = gid;
    this.resetForm();
    this.spinner.show();
    this.RestaurantService.getGroup(this.restaurantId, this.groupID).subscribe(
      data => {

        if (data.status == 200) {
          this.detailGroupName = data.group.group_name;
          this.detailGroupMenuitems = data.menuitems;
        } else {
          Swal.fire(Swaldata.SwalErrorToast(data.msg));
        }
      }, error => {
        Swal.fire(Swaldata.SwalErrorToast(error));
      }
    ).add(() => {
      this.spinner.hide()
    })
  }

  customize(id) {
    this.customizesec()
    this.resetCoustomizationForm();
    this.addOptions()
    this.groupID = id
    //get customizaions 
    this.spinner.show();
    this.RestaurantService.getCustomization(this.restaurantId, id).subscribe(
      data => {
        console.log("data: ", data)
        this.customizationslist = []
        if (data.status == 200) {
          this.customizationslist = [...data.customizations]
          console.log("customizationslist: ", this.customizationslist)
          this.detailGroupName = data.group.group_name
        } else {
          Swal.fire(Swaldata.SwalErrorToast('Something went wrong'))
        }
      },
      err => {

      }
    ).add(() => {
      this.spinner.hide()

    })
  }

  onSubmitCustomization() {
    if (!this.customizationGroup.valid)
      return

    let data = this.customizationGroup.value;
    console.log("submit: ", data)
    data['group_id'] = this.groupID;
    console.log("openTime: ", this.openTimeFormvalue)
    this.spinner.show()
    this.RestaurantService.saveCustomizations(data).subscribe(
      data => {
        if (data.status) {
          this.customizationslist = [...data.cus]
          console.log("onSubmitCustomization: ", this.customizationslist)
          Swal.fire(Swaldata.SwalSuccessToast(data.msg))
        } else {
          Swal.fire(Swaldata.SwalErrorToast(data.msg))
        }
      },
      err => {
        Swal.fire(Swaldata.SwalErrorToast(data.msg))
      }
    ).add(() => {
      this.spinner.hide();
      this.resetCoustomizationForm();
    })
  }

  editCustomization(id) {
    //get customization details
    this.spinner.show()
    this.RestaurantService.getCustomizationDetail(id).subscribe(
      data => {
        console.log("getCustomizationDetail: ", data)
        if (data.status) {

          this.resetCoustomizationForm();
          if (!data.customize[0].max) {
            data.customize[0].max = data.options.length
          }
          this.customizationGroup.patchValue({
            customize_id: data.customize[0].id,
            name: data.customize[0].name,
            max: data.customize[0].max
            // type: data.customize[0].type
          })

          data.options.forEach((element, index) => {
            let fg = this.createOptionsEdit(element);
            this.Options.push(fg);
          });

        }

      },
      err => {

      }
    ).add(() => {
      this.spinner.hide()

    })
  }

  deleteCustomization(id) {
    //confirm to remove group
    Swal.fire(Swaldata.SwalConfirm("All Customization data will deleted")).then((result) => {
      if (result.value && !isNaN(id)) {
        //delete group here 
        this.spinner.show();
        this.RestaurantService.deleteCustomization(this.restaurantId, id).subscribe(
          data => {
            if (data.status) {
              this.customizationslist = this.customizationslist.filter(ele => ele.id != id)
              Swal.fire(Swaldata.SwalSuccessToast('Customization has deleted succefully'));
            } else
              Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
          },
          error => {
            Swal.fire(Swaldata.SwalErrorToast('Something went wrong!'));
          }
        ).add(() => {
          this.spinner.hide();
        })
      }
    })
  }

  addCus() {
    this.resetCoustomizationForm();
    this.addOptions()
  }

  usemenu() {
    this.useOtherResmenu = true
    this.RestaurantService.getrestaurantslist().subscribe(
      data => {
        this.RestaurantList = data.data.filter(e => e.id != this.restaurantId)
      }
    )
  }

  copymenu() {
    if (this.selectedRes == -1)
      return Swal.fire(Swaldata.SwalErrorToast('Please select a Restaurant'))

    Swal.fire(Swaldata.SwalConfirm("All menu will be delete and choosen Restaurant data will be replaced ")).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.RestaurantService.usemenu(this.selectedRes, this.restaurantId).subscribe(
          res => {
            if (res.status) {
              Swal.fire(Swaldata.SwalSuccessToast(res.msg));

            }
            else {
              Swal.fire(Swaldata.SwalErrorToast(res.msg));
            }
          },
          error => {
            Swal.fire(Swaldata.SwalErrorToast("Something went wrong"));
          }
        ).add(() => {
          this.spinner.hide();
          this.getResGroup();
        });
      }
    })
  }


  uploadInvQuan(e) {
    let validExts = new Array(".xlsx");

    if (e.target.files[0].length < 1)
      return

    let filename = e.target.files[0].name;
    let fileext = filename.substring(filename.lastIndexOf('.'));

    if (validExts.indexOf(fileext) < 0) {
      Swal.fire(Swaldata.SwalErrorToast(`Invalid file selected, valid files are of  ${validExts.toString()} types.`))
      return false;
    }

    Swal.fire(Swaldata.SwalConfirm("Excel data will updated")).then(async (result) => {
      if (result.value) {

        await this.readExcel(e).then(r => {
          this.spinner.show()
          this.RestaurantService.uploadinvQua({ result: r, res_id: this.restaurantId, loggedInUser_Id: localStorage.getItem('currentUserId') }).subscribe(data => {
            if (data.status)
              Swal.fire(Swaldata.SwalSuccessToast(data.msg))
            else
              Swal.fire(Swaldata.SwalErrorToast(data.msg))
          }, err => {
            Swal.fire(Swaldata.SwalErrorToast(err))
          }
          ).add(() => {
            this.quaexcelInput.nativeElement.value = null
            this.spinner.hide();
          });
        })
      } else {
        this.quaexcelInput.nativeElement.value = null
      }
    })

  }

  async readExcel(event) {

    const workbook = new Excel.Workbook();
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    let exceldata = [];
    return await new Response(target.files[0]).arrayBuffer().then(function (data) {
      return workbook.xlsx.load(data).then(function () {
        // play with workbook and worksheet now

        const worksheet = workbook.getWorksheet(1);
        worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
          let item = []

          row.eachCell({ includeEmpty: true }, function (cell, colNumber) {

            item.push(cell.value)
          });

          exceldata.push(item);
        });
        exceldata.shift()
        return exceldata;
      });
    });

  }

  availableTime() {
    (<any>$('#openTimeModal')).modal('show');
  }

  copyTiming() {
    let opentime = this.openTimeForm.value.monopen_time;
    let closetime = this.openTimeForm.value.monclose_time;

    this.openTimeForm.patchValue({
      monopen_time: opentime,
      monclose_time: closetime,
      tueopen_time: opentime,
      tueclose_time: closetime,
      wedopen_time: opentime,
      wedclose_time: closetime,
      thuopen_time: opentime,
      thuclose_time: closetime,
      friopen_time: opentime,
      friclose_time: closetime,
      satopen_time: opentime,
      satclose_time: closetime,
      sunopen_time: opentime,
      sunclose_time: closetime,
    })
  }

  clearTimining(day) {
    this.openTimeForm.controls[day + 'open_time'].setValue('');
    this.openTimeForm.controls[day + 'close_time'].setValue('');
  }

  submitTimeform() {
    this.openTimeFormvalue = this.openTimeForm.value;
    (<any>$('#openTimeModal')).modal('hide');
  }
}


