'use strict'

  let args_arr = []
  let args_obj = {}

  if (window.location.search) {

    args_arr = decodeURIComponent(window.location.search).replace('?','').split('&')

    args_arr.forEach( (arg) => {
      let arg_arr = arg.split('=')

      if (arg_arr[0] && arg_arr[1]) {

        args_obj[arg_arr[0]] = arg_arr[1]

      } else if (arg_arr[0] && !arg_arr[1]) {

        args_obj[arg_arr[0]] = true

      } else {

      }
    })

    if (args_obj.location) {

      let local_forum_link = document.createElement('a')
      local_forum_link.id = 'local-forum-link'
      local_forum_link.innerHTML = args_obj.location
      local_forum_link.href = args_obj.location

      let link_list_item = document.createElement('li')
      link_list_item.appendChild(local_forum_link)

      let parent_list = document.getElementById('related-links')

      if (parent_list) {
        parent_list.appendChild(link_list_item)
      }
    }
  }
