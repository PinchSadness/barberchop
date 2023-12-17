$(document).ready(function () {
    $('.slider').slick({
        centerMode: true,
        slidesToShow: 3,
        variableWidth: true,
        arrows: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 5000,
        pauseOnFocus: true,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        responsive: [
            {
                breakpoint: 641,
                settings: {
                    dots: false,
                }
            }
        ]
    });

    $('#online').click(function () {
        $('#popup-form').addClass('open');
    })

    $('#sale').click(function () {
        $('#popup-sale').addClass('open');
    })

    $('#popup-sale *').each(function () {
        $('.popup-close').click(function () {
            $('#popup-sale').removeClass('open');
        })
    })

    $('.slider-btn').click(function (e) {
        $('#master-btn').text($(e.target).attr('data-barbername'))
        $('#popup-form').addClass('open');
    })

    $('#popup-form *').each(function () {
        $('.popup-close').click(function () {
            $('#popup-form').removeClass('open');
        })
    })


    $('.dropdown').each(function (index, dropDownWrapper) {

        const dropDownBtn = $(dropDownWrapper).find('.dropdown-button');
        const dropDownList = $(dropDownWrapper).find('.dropdown-list');
        const dropDownInput = $(dropDownWrapper).find('.dropdown-input-hidden');


        $(dropDownBtn).on('click', function () {
            $(dropDownList).toggleClass('dropdown-list-visible');
            $(this).find(dropDownList).addClass('dropdown-button-active');
        });

        $(dropDownList).on('click', function (event) {
            $(dropDownBtn).text(event.target.innerText);
            $(dropDownBtn).trigger('focus');
            $(dropDownInput).val(event.target.innerText);
            $(dropDownList).removeClass('dropdown-list-visible');
        })

        $(document).on('click', function (e) {
            if (!dropDownWrapper.contains(e.target)) {
                $(dropDownBtn).removeClass('dropdown-button-active');
                $(dropDownList).removeClass('dropdown-list-visible');
            }
        })

        $(document).on('keydown', function (e) {
            if (e.key === 'Tab' || e.key === 'Escape') {
                $(dropDownBtn).removeClass('dropdown-button-active');
                $(dropDownList).removeClass('dropdown-list-visible');
            }
        })


        const phoneInput = $('#phone-input');
        phoneInput.inputmask({"mask": "(999) 999-9999"});


        const dateInput = $('#date');
        dateInput.inputmask({"mask": "99.99.9999"});


        $('#submit').click(function () {
            let name = $('#name');
            let date = $('#date');
            let phone = $('#phone-input');
            let master = $('#master');
            let masterBtn = $('#master-btn');
            let time = $('#time');
            let timeBtn = $('#time-btn');
            let service = $('#service');
            let serviceBtn = $('#service-btn');
            let hasError = false;
            let form = $('.popup-form');
            let formTrue = $('.popup-thx');

            $('.error-input').hide();

            if (!name.val()) {
                name.next().show();
                name.addClass('order-input-error');
                name.addClass('form-input-error');
                hasError = true;
            } else {
                name.removeClass('order-input-error');
                name.removeClass('form-input-error');
            }
            if (!date.val()) {
                date.next().show();
                date.addClass('order-input-error');
                date.addClass('form-input-error');
                hasError = true;
            } else {
                date.removeClass('order-input-error');
                date.removeClass('form-input-error');
            }
            if (!phone.val()) {
                phone.next().show();
                phone.addClass('order-input-error');
                phone.addClass('form-input-error');
                hasError = true;
            } else {
                phone.removeClass('order-input-error');
                phone.removeClass('form-input-error');
            }
            if (!master.val()) {
                master.next().show();
                masterBtn.addClass('order-input-error');
                masterBtn.addClass('dropdown-button-error');
                hasError = true;
            } else {
                masterBtn.removeClass('order-input-error');
                masterBtn.removeClass('dropdown-button-error');
            }
            if (!time.val()) {
                time.next().show();
                timeBtn.addClass('order-input-error');
                timeBtn.addClass('dropdown-button-error');
                hasError = true;
            } else {
                timeBtn.removeClass('order-input-error');
                timeBtn.removeClass('dropdown-button-error');
            }
            if (!service.val()) {
                service.next().show();
                serviceBtn.addClass('order-input-error');
                serviceBtn.addClass('dropdown-button-error');
                hasError = true;
            } else {
                serviceBtn.removeClass('order-input-error');
                serviceBtn.removeClass('dropdown-button-error');
            }

            if (!hasError) {
                $.ajax({
                    method: "POST",
                    url: "https://testologia.site/checkout",
                    data: {
                        name: name.val(),
                        service: service.val(),
                        date: date.val(),
                        phone: phone.val(),
                        master: master.val(),
                        time: time.val()
                    }
                })
                    .done(function (msg) {
                        if (msg.success) {
                            alert('Ошибка в заполнении формы!');
                        } else {
                            form.hide();
                            formTrue.show();
                            $('.popup-close').click(function () {
                                formTrue.hide();
                            })
                        }
                    });
            }
        })
    })

    $('.popup-close').click(function () {
        $('#name').val('');
        $('#date').val('');
        $('#phone-input').val('');
        $('#master-btn').text('Выберете мастера');
        $('#time-btn').text('Выберете время');
        $('#service-btn').text('Выберете услугу');
    })

    new WOW({
        animateClass: 'animate__animated',
    }).init();


    $('#burger').click(function () {
        $('#menu').addClass('open');
    })

    $('#menu *').each(function () {
        $('#menu').click(function () {
            $('#menu').removeClass('open');
        })
    })
})