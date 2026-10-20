$(document).ready(function () {
    $("#btn").click(function () {
        $("#message").text("Welcome To My Page!");
        $("#output").text("You clicked the button");
    });

    $("#btn").mouseup(function () {
        $("#btn").css("background", "white");
    });

    $("#btn").mousedown(function () {
        $("#btn").css("background", "lightyellow");
    });

    $("#btn").dblclick(function () {
        $("#message").text("You double clicked the Button!");
        $("#output").text("Double click detected");
    });

    $("#btn2").click(function () {
        $("#profile").hide("slow");
        $("#output").text("Profile now hidden");
    });

    $("#btn3").click(function () {
        $("#profile").show("slow");
        $("#output").text("Profile is back");
    });

    $("#course").change(function () {
        $("#crs").text($(this).val());
        $("#output").text("You changed your course");
    });

    $("#odds").click(function () {
        $("#tb tr:odd").css("background-color", "#dce7c8");
        $("#output").text("Odd rows changed color");
    });

    $("#evens").click(function () {
        $("#tb tr:even").css("background-color", "#d9e9f5");
        $("#output").text("Even rows changed color");
    });

    $("#hide").click(function () {
        $("#tb").hide("slow");
        $("#output").text("Table hidden");
    });

    $("#show").click(function () {
        $("#tb").show("slow");
        $("#output").text("Table shown");
    });
});
