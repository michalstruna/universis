import { Texture, TextureLoader } from 'three'

import Config from '../Constants/Config'

class TextureStore {

    /**
     * Loader for load textures.
     */
    private static loader: TextureLoader = new TextureLoader()

    /**
     * List of all already loaded textures.
     */
    private static textures: Map<string, Texture> = new Map()

    private constructor() {

    }

    /**
     * Get texture from store.
     * @param name Name of texture.
     * @return THREE texture.
     */
    public static get(name: string): Texture {
        if (!TextureStore.textures.get(name)) {
            TextureStore.textures.set(name, TextureStore.load(name))
        }

        return TextureStore.textures.get(name)
    }

    /**
     * If texture doesn't exist, load it.
     * @param name Name of texture.
     * @return THREE texture.
     */
    private static load(name: string): Texture {
        const texture = TextureStore.loader.load(Config.TEXTURES_PATH + name)
        //texture.wrapS = texture.wrapT = RepeatWrapping
        //texture.repeat.set(2, 1)
        //texture.offset.set(texture.repeat.x * 2, texture.repeat.y)
        return texture
    }

}

export default TextureStore