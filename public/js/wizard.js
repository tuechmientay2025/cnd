function nextTab(elem) {
            $(elem).next().find('a[data-toggle="tab"]').click();
        }

        function prevTab(elem) {
            $(elem).prev().find('a[data-toggle="tab"]').click();
        }
$(document).ready(function() {
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function(e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });


    $(".prev-step").click(function(e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

/*
<section class="signup-step-container">
                <div class="container">
                    <div class="row  justify-content-center">
                        <div class="col-md-8">

                            <div class="wizard">
                                <div class="wizard-inner">
                                    <div class="connecting-line"></div>
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li role="presentation" class="active">
                                            <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" aria-expanded="true"><span class="round-tab">1 </span> <i>Thông tin</i></a>
                                        </li>
                                        <li role="presentation" class="disabled">
                                            <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" aria-expanded="false"><span class="round-tab">2</span> <i>Xác nhận</i></a>
                                        </li>

                                        <li role="presentation" class="disabled">
                                            <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab"><span class="round-tab">3</span> <i>Tình trạng</i></a>
                                        </li>
                                    </ul>
                                </div>

                                <form role="form" class="formpos" action="" class="login-box">
                                  
                                    <div class="tab-content" id="main_form">
                                        <div class="tab-pane active" role="tabpanel" id="step1">
                                            <div class="formdiv">
                                                
                                            </div>

 

                                        <ul class="list-inline pull-right">
                                            <li><button type="button" class="btn next-step step2">Tiếp tục</button></li>
                                        </ul>
                                     
                                        </div>
                                        
                                    <!--  -->
                                    <div class="tab-pane" role="tabpanel" id="step2">
                                        <h4 class="text-center">Confirmation</h4>

                                        <div class="info">
                                                

                                            </div>


                                        <ul class="list-inline pull-right">
                                            <li><button type="button" class="default-btn prev-step">Quay lại</button></li>
                                            <!-- <li><button type="button" class="default-btn next-step skip-btn">Skip</button></li> -->
                                            <li><button type="button" class="btn next-step  step3">Xác nhận</button></li>
                                        </ul>
                                    </div>

                                    <div class="tab-pane" role="tabpanel" id="step3">


                                        <div class="">
                                            
                                        </div>



                                        <ul class="list-inline pull-right">

                                            <li><button type="button" class="next-step finish">Màn hình chính</button></li>
                                        </ul>
                                    </div>

                                    <div class="clearfix"></div>
                            </div>

                            </form>
                        </div>
                    </div>
                </div>
        </div>
        </section>
 */