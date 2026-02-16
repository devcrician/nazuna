export default async function menuLogos(prefix, botName = "MeuBot", userName = "Usuário", {
    header = `╭┈⊰ 🌸 『 *${botName}* 』\n┊Olá, #user#!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
    menuTopBorder = "╭┈",
    bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯",
    menuTitleIcon = "🍧ฺꕸ▸",
    menuItemIcon = "•.̇𖥨֗🍓⭟",
    separatorIcon = "❁",
    middleBorder = "┊"
} = {}) {
    const formattedHeader = header.replace(/#user#/g, userName);
    return `${formattedHeader}

${menuTopBorder}${separatorIcon} *MENU LOGOS*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}darkgreen
${middleBorder}${menuItemIcon}${prefix}glitch
${middleBorder}${menuItemIcon}${prefix}write
${middleBorder}${menuItemIcon}${prefix}advanced 
${middleBorder}${menuItemIcon}${prefix}typography
${middleBorder}${menuItemIcon}${prefix}pixel
${middleBorder}${menuItemIcon}${prefix}neon
${middleBorder}${menuItemIcon}${prefix}flag
${middleBorder}${menuItemIcon}${prefix}americanflag
${middleBorder}${menuItemIcon}${prefix}deleting
${bottomBorder}`;
}