# osx-dotfiles
Dotfiles for my OS X theme. (i3, picom, xborder)

## Screenshots
![A screenshot of an OS X like theme for Arch, containing a Spotify window, a Neofetch window and a btop window.](https://github.com/madeline-xoxo/osx-dotfiles/blob/main/resources/screenshot-1.png?raw=true)
![A screenshot of an OS X like theme for Arch, with an empty desktop.](https://github.com/madeline-xoxo/osx-dotfiles/blob/main/resources/screenshot-2.png?raw=true)

## Installation
You'll want picom, i3, polybar, xborder (see i3 config for how to set it up), npm and node, and to do a few things:

1. `npm i -g ts-node`
2. `which ts-node`
3. Go into i3 config and in the window module, replace my path to ts-node with yours. You may also need to run `npm i -g typescript`.
4. Go into Polybar folder and run `npm i` (Sorry for the terrible solution to window names, it probably won't work for you. This is because I am not good at Bash and so I had to write it in Typescript.)
5. Move wallpaper to ~/Pictures/wallpaper.png
