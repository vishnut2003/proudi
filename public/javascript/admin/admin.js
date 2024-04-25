$('#user-info-hover').hide()
$(document).ready(() => {
    // Admin Header user-info hover effect
    $('#admin-user-info').hover(() => {
        $('#user-info-hover').show()
    }, () => {
        $('#user-info-hover').hide()
    })

    $('#user-info-hover').hover(() => {
        $('#user-info-hover').show()
    }, () => {
        $('#user-info-hover').hide()
    })

    const admin_menu_toggle = $('#admin-menu-toggle')
    const admin_sidebar = $('#admin-sidebar-jq')
    const admin_menu_close = $("#admin-sidebar-close")

    admin_menu_toggle.click(() => {
        admin_sidebar.css('width', '250px');
    })
    admin_menu_close.click(() => {
        admin_sidebar.css('width', '0')
    })

    
})