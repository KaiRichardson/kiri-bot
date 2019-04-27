var curentTab = "movie";

// tab switch
$(".top_btn").on("click", function () {
    // console.log($(this).attr("id"));
    $("#empty_from").text("");

    if ($(this).attr("id") === "movie_btn") {
        $("#search_bar").css("background-color", "rgb(116, 116, 255)");
        $("#end_cap").css("background-color", "rgb(116, 116, 255)");
        $("#text_input").attr("placeholder", "Speed...");
        $("#text_input").val("");
        curentTab = "movie";
        $("#band_div").animate({
            opacity: 0,
            width: "1000px",
            height: "0"
        }, 1000, function () {
        });

    } else if ($(this).attr("id") === "band_btn") {
        $("#search_bar").css("background-color", "rgb(72, 72, 255)");
        $("#end_cap").css("background-color", "rgb(72, 72, 255)");
        $("#text_input").attr("placeholder", "Taylor Swift...");
        $("#text_input").val("");
        curentTab = "band";
        $("#movie_div").animate({
            opacity: 0,
            width: "1000px",
            height: "0"
        }, 1000, function () {
        });

    };
});

// user input validation
$("#text_submit").on("click", function () {
    diveExspand();
});

function diveExspand() {
    if ($("#text_input").val() === "") {
        $("#empty_from").text("*please add a " + curentTab + "*");

    } else {
        $("#text_input").val("");
        $("#empty_from").text("");

        if (curentTab === "movie") {

            $("#splash_div").animate({
                top: "10%",
                width: "1000px"
            }, 1000);
            $("#search_bar").animate({width: "1000px"}, 1000);
            $("#btn_div").animate({width: "1000px"}, 1000);
            $("#movie_div").animate({
                opacity: 0.75,
                width: "1000px",
                height: "600px"
            }, 1000);
            $("#end_cap").animate({width: "1000px"}, 1000);

        } else {

            $("#splash_div").animate({
                top: "10%",
                width: "1000px"
            }, 1000);
            $("#search_bar").animate({width: "1000px"}, 1000);
            $("#btn_div").animate({width: "1000px"}, 1000);
            $("#band_div").animate({
                opacity: 0.75,
                width: "1000px",
                height: "600px"
            }, 1000);
            $("#end_cap").animate({width: "1000px"}, 1000);
        };
    };
};