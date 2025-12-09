# Agent Photos

Add your sales agent photos here with the following naming convention:

- `juan-perez.jpg`
- `maria-gonzalez.jpg`
- `carlos-rodriguez.jpg`
- `ana-martinez.jpg`
- `roberto-sanchez.jpg`

## Recommended Specifications:
- **Format**: JPG or PNG
- **Size**: 400x400px (square)
- **File size**: Under 200KB for optimal loading
- **Background**: Professional headshot with neutral background

## Fallback Behavior:
If a photo is not found, the system will automatically generate a fallback avatar using the agent's name.

To update the photo paths, edit `/src/data/agents.ts` and change the `photo` field for each agent.
