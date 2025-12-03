$(document).ready(function () {
  $(document).on('change',".selectoption",function(){
    var id = $(this).closest('tr').data("id");
    bootbox.prompt("Ghi chú",function(res){
      if(res){
        $.ajax({
          url: "https://templates.ahlupos.com/wp-admin/admin-ajax.php?action=invoice_update",
          method: "POST",
          async: true,  
          data:{id:id,note:res},
          success: function (json) {
            bootbox.alert(json);
          }
        });
      } 
       
    });
  });

  if($.fn.dataTable){
    $.extend( true, $.fn.dataTable.defaults, {
      language: {
          "decimal":        "",
          "emptyTable":     "Không có dữ liệu",
          "info":           "Hiển thị _START_ đến _END_ / _TOTAL_ mục",
          "infoEmpty":      "Hiển thị 0 đến 0 trong số 0 mục",
          "infoFiltered":   "(được lọc từ tổng số _MAX_ mục nhập)",
          "infoPostFix":    "",
          "thousands":      ",",
          "lengthMenu":     "Hiển thị các mục _MENU_",
          "loadingRecords": "Đang tải...",
          "processing":     "Processing...",
          "search":         "Tìm kiếm:",
          "zeroRecords":    "Không tìm thấy kết quả",
          "paginate": {
              "first":      "Đầu tiên",
              "last":       "Cuối cùng",
              "next":       "Kế tiếp",
              "previous":   "Trước"
          },
          "aria": {
              "sortAscending":  ": kích hoạt để sắp xếp cột tăng dần",
              "sortDescending": ": kích hoạt để sắp xếp cột giảm dần"
          }
      }
    } );
  }
  //Only needed for the filename of export files.
  //Normally set in the title tag of your page.
 
  // DataTable initialisation
  $('#example').DataTable(
  {
 //  	"ajax": {
	//     "url": "https://templates.ahlupos.com/wp-admin/admin-ajax.php?action=invoices",
	//     "type": "POST",
	//     dataSrc: function ( json ) {
	//     	console.log(json);
	//       for ( var i=0, ien=json.length ; i<ien ; i++ ) {
	//         // json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
	//       }
	//       return json;
	//     }
	// },
    "dom": '<"dt-buttons"Bf><"clear">lirtp',
    "paging": true,
    "autoWidth": true,
    "buttons": [
    {
      extend: 'excelHtml5',
      text: 'Excel',
      customize: function (xlsx) {
        //Add sheet2 to [Content_Types].xml => <Types>
        //============================================
        var source = xlsx['[Content_Types].xml'].getElementsByTagName('Override')[1];
        var clone = source.cloneNode(true);
        clone.setAttribute('PartName', '/xl/worksheets/sheet2.xml');
        xlsx['[Content_Types].xml'].getElementsByTagName('Types')[0].appendChild(clone);

        //Add sheet relationship to xl/_rels/workbook.xml.rels => Relationships
        //=====================================================================
        var source = xlsx.xl._rels['workbook.xml.rels'].getElementsByTagName('Relationship')[0];
        var clone = source.cloneNode(true);
        clone.setAttribute('Id', 'rId3');
        clone.setAttribute('Target', 'worksheets/sheet2.xml');
        xlsx.xl._rels['workbook.xml.rels'].getElementsByTagName('Relationships')[0].appendChild(clone);

        //Add second sheet to xl/workbook.xml => <workbook><sheets>
        //=========================================================
        var source = xlsx.xl['workbook.xml'].getElementsByTagName('sheet')[0];
        var clone = source.cloneNode(true);
        clone.setAttribute('name', 'Info');
        clone.setAttribute('sheetId', '2');
        clone.setAttribute('r:id', 'rId3');
        xlsx.xl['workbook.xml'].getElementsByTagName('sheets')[0].appendChild(clone);

        //Add sheet2.xml to xl/worksheets
        //===============================
        var today = new Date();
        var cMonth = today.getMonth() + 1;
        var cDay = today.getDate();
        var dateNow = (cMonth < 10 ? '0' + cMonth : cMonth) + '-' + (cDay < 10 ? '0' + cDay : cDay) + '-' + today.getFullYear();
        var newSheet = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" mc:Ignorable="x14ac">' +
        '<cols >' +
        '<col min="1" max="1" width="24.7" customWidth="1"/>' +
        '<col min="2" max="2" width="37.7" customWidth="1"/>' +
        '</cols>' +
        '<sheetData>' +
        '<row  r="1">' +
        '<c t="inlineStr" r="A1" s="7">' +
        '<is>' +
        '<t>Information sheet</t>' +
        '</is>' +
        '</c>' +
        '</row>' +
        '<row  r="2">' +
        '<c t="inlineStr" r="A2" s="2">' +
        '<is>' +
        '<t>Created by</t>' +
        '</is>' +
        '</c>' +
        '<c t="inlineStr" r="B2" s="3">' +
        '<is>' +
        '<t>F12Magic</t>' +
        '</is>' +
        '</c>' +
        '</row>' +
        '<row  r="3">' +
        '<c t="inlineStr" r="A3" s="2">' +
        '<is>' +
        '<t>Date</t>' +
        '</is>' +
        '</c>' +
        '<c t="inlineStr" r="B3" s="3">' +
        '<is>' +
        '<t>' + dateNow + '</t>' +
        '</is>' +
        '</c>' +
        '</row>' +
        '</sheetData>' +
        '<mergeCells count="1">' +
        '<mergeCell  ref="A1:B1"/>' +
        '</mergeCells>' +
        '</worksheet>';
        xlsx.xl.worksheets['sheet2.xml'] = $.parseXML(newSheet);
      } }] });




});