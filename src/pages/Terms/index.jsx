import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { theme } from '../../utils/style/colors'
import { StyledLoginPage } from '../../utils/style/LoginSignStyle'
import { WaveJoin } from '../Join/JoinStyle'
import {
    HomePage,
    LastModif,
    StyledH2,
    StyledSection,
} from '../Privacy/StyledPrivacy'

const Terms = () => {
    return (
        <>
            <Helmet>
                <title>Apando / Conditions d'Utilisation</title>
            </Helmet>
            <Header />
            <StyledLoginPage style={{ marginTop: '-7.5em', width: '100%' }}>
                <div>
                    <HomePage>
                        <h1
                            style={{
                                color: theme.font_color,
                                paddingTop: '5em',
                                textAlign: 'center',
                            }}
                        >
                            Conditions d'Utilisation de Apando
                        </h1>
                        <LastModif>
                            Dernière modification : le 7 mars 2022
                        </LastModif>
                        <StyledSection>
                            Le présent document a pour objet de définir les
                            modalités et conditions dans lesquelles d’une part,
                            Apando, ci-après dénommé l’EDITEUR, met à la
                            disposition de ses utilisateurs le site, et les
                            services disponibles sur le site et d’autre part, la
                            manière par laquelle l’utilisateur accède au site et
                            utilise ses services. Toute connexion au site est
                            subordonnée au respect des présentes conditions.
                            Pour l’utilisateur, le simple accès au site de
                            l’EDITEUR à l’adresse URL suivante :{' '}
                            <a href="apando.fr/">https://apando.fr</a> implique
                            l’acceptation de l’ensemble des conditions décrites
                            ci-après.
                            <br /> <br />
                            La structure générale du site Apando, ainsi que les
                            textes, graphiques, images, sons et vidéos la
                            composant, sont la propriété de l'éditeur ou de ses
                            partenaires. Toute représentation et/ou reproduction
                            et/ou exploitation partielle ou totale des contenus
                            et services proposés par le site Apando, par quelque
                            procédé que ce soit, sans l'autorisation préalable
                            et par écrit de Apando et/ou de ses partenaires est
                            strictement interdite et serait susceptible de
                            constituer une contrefaçon au sens des articles L
                            335-2 et suivants du Code de la propriété
                            intellectuelle.
                        </StyledSection>

                        <StyledSection>
                            <StyledH2>Liens hypertextes</StyledH2>
                            Le site Apando peut contenir des liens hypertextes
                            vers d’autres sites présents sur le réseau Internet.
                            Les liens vers ces autres ressources vous font
                            quitter le site Apando. Il est possible de créer un
                            lien vers la page de présentation de ce site sans
                            autorisation expresse de l’EDITEUR. Aucune
                            autorisation ou demande d’information préalable ne
                            peut être exigée par l’éditeur à l’égard d’un site
                            qui souhaite établir un lien vers le site de
                            l’éditeur. Il convient toutefois d’afficher ce site
                            dans une nouvelle fenêtre du navigateur. Cependant,
                            l’EDITEUR se réserve le droit de demander la
                            suppression d’un lien qu’il estime non conforme à
                            l’objet du site Apando.
                        </StyledSection>
                        <StyledSection>
                            <StyledH2>Responsabilité de l'éditeur</StyledH2>
                            Les informations et/ou documents figurant sur ce
                            site et/ou accessibles par ce site sont postés par
                            d'autres utilisateurs de ce site. Toutefois, ces
                            informations et/ou documents sont susceptibles de
                            contenir des inexactitudes, être mensonger (Fake
                            news), ou encore dangereux. . L’EDITEUR se réserve
                            le droit de les corriger, dès que ces erreurs sont
                            portées à sa connaissance. Il est fortement
                            recommandé de vérifier l’exactitude et la pertinence
                            des informations et/ou documents mis à disposition
                            sur ce site. Les informations et/ou documents
                            disponibles sur ce site sont susceptibles d’être
                            modifiés à tout moment, et peuvent avoir fait
                            l’objet de mises à jour. En particulier, ils peuvent
                            avoir fait l’objet d’une mise à jour entre le moment
                            de leur téléchargement et celui où l’utilisateur en
                            prend connaissance. L’utilisation des informations
                            et/ou documents disponibles sur ce site se fait sous
                            l’entière et seule responsabilité de l’utilisateur,
                            qui assume la totalité des conséquences pouvant en
                            découler, sans que l’EDITEUR puisse être recherché à
                            ce titre, et sans recours contre ce dernier.
                            L’EDITEUR ne pourra en aucun cas être tenu
                            responsable de tout dommage de quelque nature qu’il
                            soit résultant de l’interprétation ou de
                            l’utilisation des informations et/ou documents
                            disponibles sur ce site.
                        </StyledSection>
                        <StyledSection>
                            <StyledH2>Accès au site</StyledH2>
                            L’éditeur s’efforce de permettre l’accès au site 24
                            heures sur 24, 7 jours sur 7, sauf en cas de force
                            majeure ou d’un événement hors du contrôle de
                            l’EDITEUR, et sous réserve des éventuelles pannes et
                            interventions de maintenance nécessaires au bon
                            fonctionnement du site et des services. Par
                            conséquent, l’EDITEUR ne peut garantir une
                            disponibilité du site et/ou des services, une
                            fiabilité des transmissions et des performances en
                            terme de temps de réponse ou de qualité. Il n’est
                            prévu aucune assistance technique vis à vis de
                            l’utilisateur que ce soit par des moyens
                            électronique ou téléphonique. La responsabilité de
                            l’éditeur ne saurait être engagée en cas
                            d’impossibilité d’accès à ce site et/ou
                            d’utilisation des services. Par ailleurs, l’EDITEUR
                            peut être amené à interrompre le site ou une partie
                            des services, à tout moment sans préavis, le tout
                            sans droit à indemnités. L’utilisateur reconnaît et
                            accepte que l’EDITEUR ne soit pas responsable des
                            interruptions, et des conséquences qui peuvent en
                            découler pour l’utilisateur ou tout tiers.
                        </StyledSection>

                        <StyledSection>
                            <StyledH2>Compte de l'utilisateur</StyledH2>
                            L'utilisateur est responsable de ses identifiants de
                            connexion ainsi que de toute activité résultant leur
                            utilisation. Si l'utilisateur ne dispose pas d'un
                            Compte lors de l'accès aux zones du service Apando,
                            il sera invité à en créer un en fournissant un nom
                            d'utilisateur, un mot de passe ainsi que d'une
                            adresse e-mail valide. L'utilisateur se représente
                            et se porte garant que les informations qu'il a
                            fourni lors de son inscription et à tout autre
                            moment sont vraies, précises, actuelles et
                            complètes. L'EDITEUR se réserve le droit de refuser
                            tout nom d'utilisateur ou de résilier le nom
                            d'utilisateur ou d'empêcher le nom d'utilisateur à
                            la seule discrétion de l'EDITEUR et sans aucune
                            responsabilité envers l'utilisateur. L'utilisateur
                            s'assure que son adresse e-mail est correcte et à
                            jour à tout moment. L'utilisateur accepte d'avertir
                            l'EDITEUR immédiatement s'il pense que le caractère
                            confidentiel de ses identifiants de connexion a été
                            compromis ou s'il suspecte une utilisation non
                            autorisée de son Compte. L'utilisateur accepte le
                            fait que l'EDITEUR ne sera pas reponsable de toute
                            perte ou tout dommage provenant d'une utilisation
                            non autorisée de ses identifiants.
                        </StyledSection>

                        <StyledSection>
                            <StyledH2>
                                Règles de Conduite et d'Utilisation
                            </StyledH2>
                            L'utilisateur a à disposition des salons de
                            communications destinés à l'utilisateur de
                            communiquer avec d'autres utilisateurs de Apando.
                            L'EDITEUR n'a aucune obligation de surveiller ces
                            salons de communication. Il est également possible
                            que l'EDITEUR mette un terme ou suspende à
                            l'utilisateur l'accès à tout Salon de Communication
                            à tout moment, sans préavis, pour toute raison.
                            L'utilisateur reconnait que Apando ne supporte aucun
                            contenu d'utilisateur. Apando n'est en aucun cas
                            responsable des informations que l'utilisateur a
                            choisis de partager dans les Salons de
                            Communication, ou des actions des autres
                            utilisateurs. De plus, en utilisant les services
                            proposés par Apando, l'utilisateur accepte la charte
                            du bon comportement sur Internet dont : <br />-
                            diffamer, calomnier, tourner en ridicule, moquer,
                            traquer, harceler, intimider ou maltraiter
                            quiconque.
                            <br /> - se livrer à une conduite qui est
                            frauduleuse ou illégale qui pourrait porter
                            préjudice à Apando ou tout autre utilisateur.
                            <br /> - mettre en ligne ou transmettre (ou tenter
                            de mettre en ligne ou transmettre) des fichiers
                            contenant des virus, des chevaux de Troie, des vers,
                            des bombes à retardement, des robots d'annulation,
                            de fichiers ou données corrompues ou tout autre
                            logiciel ou programme similaire, ou se livrer à
                            toute autre activité pouvant endommager le
                            fonctionnement de Apando ou des ordinateurs d'autres
                            utilisateurs <br /> - violer la propriété
                            contractuelle, personnelle, intellectuelle ou tout
                            autre droit de toute partie. Cela inclut
                            l'utilisation, la mise en ligne, la transmission, la
                            distribution ou la publication de toute autre
                            manière de toute information présente sur le Service
                            transgressant tout droit d'auteur, toute marque
                            déposée, tout brevet, tout secret industriel, ou
                            tout autre droit de toute partie (cela inclut les
                            droits de confidentialité ou de publicité).
                            <br /> - tenter d'obtenir les mots de passe ou
                            d'autres informations privées d'autres membres. Ces
                            règles d'utilisation ne sont pas destinées à être
                            exhaustives, et nous nous réservons le droit de
                            déterminer les conduites violant les Conditions, la
                            Charte d’Utilisation de la Communauté ou témoignant
                            d'une utilisation déplacée du Service et de prendre
                            des mesures comme la résiliation de votre Compte et
                            l'exclusion de toute participation future au
                            Service.
                        </StyledSection>

                        <StyledSection>
                            <StyledH2>
                                Modification des conditions d'utilisation
                            </StyledH2>
                            L’EDITEUR se réserve la possibilité de modifier, à
                            tout moment et sans préavis, les présentes
                            conditions d’utilisation afin de les adapter aux
                            évolutions du site et/ou de son exploitation.
                            <StyledH2>Règles d'usage d'Internet</StyledH2>
                            L’utilisateur déclare accepter les caractéristiques
                            et les limites d’Internet, et notamment reconnaît
                            que : <br /> <br /> L’EDITEUR n’assume aucune
                            responsabilité sur les services accessibles par
                            Internet et n’exerce aucun contrôle de quelque forme
                            que ce soit sur la nature et les caractéristiques
                            des données qui pourraient transiter par
                            l’intermédiaire de son centre serveur. <br />{' '}
                            L’utilisateur reconnaît que les données circulant
                            sur Internet ne sont pas protégées notamment contre
                            les détournements éventuels. La présence du logo
                            Apando institue une présomption simple de validité.
                            La communication de toute information jugée par
                            l’utilisateur de nature sensible ou confidentielle
                            se fait à ses risques et périls. <br />{' '}
                            L’utilisateur reconnaît que les données circulant
                            sur Internet peuvent être réglementées en termes
                            d’usage ou être protégées par un droit de propriété.{' '}
                            <br />
                            L’utilisateur est seul responsable de l’usage des
                            données qu’il consulte, interroge et transfère sur
                            Internet.
                            <br />
                            L’utilisateur reconnaît que l’EDITEUR ne dispose
                            d’aucun moyen de contrôle sur le contenu des
                            services accessibles sur Internet
                        </StyledSection>

                        <StyledSection>
                            <StyledH2>Droit applicable</StyledH2>
                            Tant le présent site que les modalités et conditions
                            de son utilisation sont régis par le droit français,
                            quel que soit le lieu d’utilisation. En cas de
                            contestation éventuelle, et après l’échec de toute
                            tentative de recherche d’une solution amiable, les
                            tribunaux français seront seuls compétents pour
                            connaître de ce litige. Pour toute question relative
                            aux présentes conditions d’utilisation du site, vous
                            pouvez nous écrire à l’adresse suivante :{' '}
                            <a href="mailto:pando.contact.mayeux@gmail.com">
                                pando.contact.mayeux@gmail.com
                            </a>
                        </StyledSection>

                        <StyledSection>
                            Les présentes conditions générales (CGU) sont une
                            reproduction du{' '}
                            <a href="http://www.droitissimo.com/contrat/conditions-generales-dutilisation-cgu-dun-site-internet">
                                Modèle de CGU (conditions générales
                                d'utilisation) d'un site Internet{' '}
                            </a>
                            , dont le titulaire des droits d'auteur est{' '}
                            <a href="http://www.droitissimo.com/">
                                DROITISSIMO.COM, site internet d'information
                                juridique grand public
                            </a>
                            .
                        </StyledSection>
                    </HomePage>
                </div>
                <WaveJoin />
                <Footer />
            </StyledLoginPage>
        </>
    )
}

export default Terms
