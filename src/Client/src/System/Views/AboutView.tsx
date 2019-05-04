import * as ClassNames from 'classnames'
import * as React from 'react'

import { View } from '../../Utils'

interface IProps {
    strings: Universis.Strings
}

class AboutView extends View<IProps> {

    private renderArticles(): React.ReactNode {
        const { strings } = this.props

        return strings.articles.map((article, key) => (
            <React.Fragment key={key}>
                <article className={ClassNames('about__article', { 'about__article--right': key % 2 === 0 })}>
                    {key % 2 === 0 ? (
                        <>
                            <h2 className='about__article__title'>
                                {article.title}
                            </h2>
                            <p className='about__article__paragraph' dangerouslySetInnerHTML={{ __html: article.text }} />
                        </>
                    ) : (
                        <>
                            <p className='about__article__paragraph' dangerouslySetInnerHTML={{ __html: article.text }} />
                            <h2 className='about__article__title'>
                                {article.title}
                            </h2>
                        </>
                    )}
                </article>
                {article.image ? (
                    <img
                        className='about__article__image'
                        src={`/Images/About/${article.image}`} />
                ) : null}
            </React.Fragment>
        ))
    }

    public render(): React.ReactNode {
        const { strings } = this.props

        return (
            <section className={this.getClassName('about', true)}>
                <section className='about--inner'>
                    <h1 className='about__title'>
                        {strings.title}
                    </h1>
                    {this.renderArticles()}
                </section>
            </section>
        )
    }

}

export default AboutView.connect(
    ({ system, user }: Universis.Redux.StoreState) => ({
        strings: system.strings.about
    })
)