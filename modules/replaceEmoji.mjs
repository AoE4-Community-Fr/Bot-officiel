function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function getEmoji(client, textEmote)
{
	return "<:" + textEmote + ":" + client.emojis.cache.find(emoji => emoji.name === textEmote) + ">";
}

export function replaceNitroEmoji(client, message) {
    let associativEmoji = new Map();
    associativEmoji.set("<:BronzeRank:1041402251811495947>", getEmoji(client, "solo_bronze_2"));
    associativEmoji.set("<:GoldRank:1041402347198365808>", getEmoji(client, "solo_gold_2"));
    associativEmoji.set("<:PlatinumRank:1041402382002683975>", getEmoji(client, "solo_platinum_2"));
    associativEmoji.set("<:DiamondRank:1041402425522802758>", getEmoji(client, "solo_diamond_2"));
    associativEmoji.set("<:ConquerorRank:1041402458208993310>", getEmoji(client, "solo_conqueror_3"));
    associativEmoji.set("<:LowEloLegends:1017911068355481711>", "",);
    associativEmoji.set("<:WarchiefClub:1017911128971559082>", "",);
	
    const AllEntities = associativEmoji.entries();
    for (entries of AllEntities) {
        message = replaceAll(message, entries[0], entries[1]);
    }

	let patern = new RegExp("<:\w+:[\d]+>", 'g');

    if (patern.test(message))
    {
		console.log("Erreur")
        throw new SyntaxError("Un des emoji du texte n'est pas dans la table associative d'emoji")
    }

    return message;
}