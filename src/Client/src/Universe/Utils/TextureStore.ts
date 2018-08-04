import { Texture, TextureLoader } from 'three'

import Config from '../Constants/Config'

class TextureStore {

    /**
     * Loader for load textures.
     */
    private static loader: TextureLoader = new TextureLoader()

    /**
     * List of all already loaded textures.
     * @type {{}}
     */
    private static textures: IObject<Texture> = {}

    private constructor() {

    }

    /**
     * Get texture from store.
     * @param name Name of texture.
     * @return THREE texture.
     */
    public static get(name: string): Texture {
        if (!TextureStore.textures[name]) {
            TextureStore.textures[name] = TextureStore.load(name)
        }

        return TextureStore.textures[name]
    }

    /**
     * If texture doesn't exist, load it.
     * @param name Name of texture.
     * @return THREE texture.
     */
    private static load(name: string): Texture {
        return TextureStore.loader.load(Config.TEXTURES_PATH + name)
    }

}

export default TextureStore