export default async function menuLogos(prefix, botName = "MeuBot", userName = "Usuário", {
    header = `╭┈⊰ 🌸 『 *${botName}* 』\n┊Olá, #user#!\n╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯`,
    menuTopBorder = "╭┈",
    bottomBorder = "╰─┈┈┈┈┈◜❁◞┈┈┈┈┈─╯",
    menuTitleIcon = "🍧ฺꕸ▸",
    menuItemIcon = "•.̇𖥨֗🍓⭟",
    separatorIcon = "❁",
    middleBorder = "┊",
    Logos1txtTitle = "🎨 LOGOTIPOS 1TXT",
    Logos2txtTitle = "🖼 LOGOTIPOS 2TXT"
} = {}) {
    const formattedHeader = header.replace(/#user#/g, userName);
    return `${formattedHeader}

${menuTopBorder}${separatorIcon} *${Logos1txtTitle}*
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
${bottomBorder}

${menuTopBorder}${separatorIcon} *${Logos2txtTitle}*
${middleBorder}
${middleBorder}${menuItemIcon}${prefix}pornhub
${middleBorder}${menuItemIcon}${prefix}avengers
${middleBorder}${menuItemIcon}${prefix}graffiti
${middleBorder}${menuItemIcon}${prefix}captainamerica
${middleBorder}${menuItemIcon}${prefix}stone3d
${middleBorder}${menuItemIcon}${prefix}neon2
${middleBorder}${menuItemIcon}${prefix}thor
${middleBorder}${menuItemIcon}${prefix}amongus
${middleBorder}${menuItemIcon}${prefix}deadpool
${middleBorder}${menuItemIcon}${prefix}blackpink
${bottomBorder}`;
}