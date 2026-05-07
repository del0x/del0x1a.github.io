---
title: Unbricking my Tada68
date: 2026-03-29
tags: [mechanical_keyboards]
resources:
  - https://docs.qmk.fm/newbs_getting_started


---

The Tada68 was the my first foray into the world of mechanical keyboards. I got it just before starting at university and it carried me through the entire duration of it. After graduation I started working and finally had a bit more disposable income and so I started diving deeper into the world of mechanical keyboards, which led to my Tada68 taking the backseat for a good while. 

After many years I decided to take out the ol' reliable and try it out again, see if it still felt good to type on and if my tastes had changed since way back then. Unfortunately when I tried to plug it into my computer, it gave no response. Tried the same for several different environments, both Windows and Linux but it refused. I could see that it had power since the backlight was on but the keys were not responding at all. So, this lead me to figuring out how to unbrick it, which seems like it is notorious for doing due to using the QMK firmware. I didn't read too much into it other than that, could be that there exists updates which fix all these issues etc etc, maintained software is rarely static to say the least. In any case, enough yapping!

I kinda had to do this in a way more difficult way than needed since I was using my Windows machine with WSL. So assuming that you're using some type of unix machine, here goes!

Suppose I should preface this one with:

WARNING DO THIS AT YOUR OWN RISK!

Install qmk

```
curl -fsSL https://install.qmk.fm | sh
```

Run the execution command

```
qmk setup
```

Test out the build environment

```
qmk compile -kb tada68 -km default
```

Cool! That will generate the default keymap for use with the Tada68. Seems like you can play around with this option to get other interesting combinations of keymaps going. There should be a file called __tada68_default.bin__ in the same folder as the qmk tool in your Linux environment.

1. Copy the default_bin file into Windows so you have it available.
2. Install the QMK Toolbox on Windows just to make things easier.
3. Open QMK Toolbox and drag the file to the 'Local file' option in the gui.
4. Plug in your Tada68 and press the reset button on the back of the keyboard. It should start blinking.
5. Check that the device has been mounted, you should be able to reach the folder for it and see that it contains a file called: FLASH.bin.
6. Make a copy of this file just in case so you can always revert.
7. Hit that sweet sweet 'Flash' button in the QMK Toolbox gui.
8. ???
9. Profit.
10. Now this part is IMPORTANT. DO NOT EJECT THE KEYBOARD. You need to press Esc and that will end the flash mode.

Congratulations on flashing and fixing your Tada68. Now this is what worked for me and might just be specific for me, who knows. I imagine that these instructions could be generalized to other keyboards as well. The qmk software was quite nice and easy to use.

Hopefully I won't need to do this in the future...

