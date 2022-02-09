import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { theme } from '../../utils/style/colors'
import { StyledLoginPage } from '../../utils/style/LoginSignStyle'
import { WaveJoin } from '../Join/JoinStyle'
import { HomePage, LastModif, StyledH2, StyledSection } from './StyledPrivacy'

const Privacy = () => {
    return (
        <>
            <Header />
            <StyledLoginPage style={{ marginTop: '-50px' }}>
                <div>
                    <HomePage>
                        <h1
                            style={{
                                color: theme.font_color,
                                paddingTop: '30px',
                                textAlign: 'center',
                            }}
                        >
                            Politique de confidentialité
                        </h1>
                        <LastModif>
                            Dernière mise à jour et entrée en vigueur : le 9
                            février 2022
                        </LastModif>
                        <StyledSection>
                            <p>
                                Cette Politique de Confidentialité décrit Nos
                                politiques et procédures relatives à la
                                collecte, l'utilisation et la divulgation de vos
                                informations lorsque vous utilisez le Service et
                                vous informe de vos droits en matière de
                                confidentialité et de la manière dont la loi
                                vous protège.
                            </p>
                            <p>
                                Nous utilisons vos données personnelles pour
                                fournir et améliorer le Service. En utilisant le
                                Service, vous acceptez la collecte et
                                l'utilisation des informations conformément à la
                                présente Politique de Confidentialité. La
                                présente Politique de Confidentialité a été
                                créée à l'aide de{' '}
                                <a
                                    href="https://www.privacypolicies.com/blog/privacy-policy-template/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Privacy Policy Template
                                </a>
                                .
                            </p>
                        </StyledSection>
                        <StyledSection>
                            <h1>Interprétation et Définitions</h1>
                            <StyledH2>Interprétation</StyledH2>
                            <p>
                                Les mots dont la lettre initiale est capitalisée
                                ont un sens définie selon les conditions
                                suivantes. Les définitions suivantes ont le même
                                sens, quelles ques soient leurs apparitions, au
                                singulier ou pluriel.
                            </p>

                            <StyledH2>Définitions</StyledH2>
                            <p>
                                Aux fins de la présente Politique de
                                Confidentialité :
                            </p>
                            <ul>
                                <li>
                                    <p>
                                        <strong>Compte</strong> signifie un
                                        compte unique créé par Vous afin accéder
                                        à notre Service ou à certaines parties
                                        de notre Service
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Compagnie</strong> (désignée par
                                        les termes &quot;La Compagnie&quot;,
                                        &quot;La Société&quot;,
                                        &quot;Nous&quot;, &quot;Notre&quot; ou
                                        &quot;Nos&quot; dans le présent Contrat)
                                        désigne Pando.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Les Cookies</strong> sont de
                                        petits fichiers qui sont placés sur
                                        votre ordinateur, votre appareil mobile
                                        ou tout autre appareil par un site web,
                                        contenant les détails de votre
                                        historique de sur ce site web, parmi ses
                                        nombreuses utilisations.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Pays</strong> se réfère à la
                                        France
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Appareil</strong> désigne tout
                                        dispositif qui peut accéder au Service,
                                        tel un ordinateur, un téléphone portable
                                        ou une tablette numérique.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            Les Données Personnelles
                                        </strong>{' '}
                                        sont toutes informations qui se rapporte
                                        à une individu identifié ou
                                        identifiable.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Service</strong> désigne le Site
                                        Web.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Prestataire de Service</strong>{' '}
                                        désigne toute personne physique ou
                                        morale qui traite les données pour le
                                        compte de la Société. Il s'agit de tiers
                                        sociétés ou personnes employées par la
                                        Société Société pour faciliter le
                                        Service, pour fournir le service pour le
                                        compte de la Société, pour fournir des
                                        services liés au service ou pour aider
                                        la société à analyser analyser la façon
                                        dont le service est utilisé
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Données d'Utilisation</strong>{' '}
                                        désignent les données collectées
                                        automatiquement, soit générées par
                                        l'utilisation du service, soit provenant
                                        de l'infrastructure du service elle-même
                                        (par exemple, la durée de la visite
                                        d'une page).
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Site Web</strong> désigne Pando,
                                        accessible depuis{' '}
                                        <a
                                            href="https://pando-5ec96.web.app"
                                            rel="external nofollow noopener noreferrer"
                                            target="_blank"
                                        >
                                            https://pando-5ec96.web.app
                                        </a>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Vous</strong> désigne la
                                        personne qui accède au Service ou
                                        l'utilise, ou la société ou autre entité
                                        juridique au nom de laquelle cette
                                        personne accède au Service ou l'utilise,
                                        selon le cas.
                                    </p>
                                </li>
                            </ul>
                        </StyledSection>
                        <StyledSection>
                            <h1>
                                Collecte et Utilisation de Vos Données
                                Personnelles
                            </h1>
                            <StyledH2>Types de Données Collectées</StyledH2>
                            <h3>Données Personnelles</h3>
                            <p>
                                Lors de l'utilisation de Notre Service, nous
                                pouvons vous demander de nous fournir certaines
                                informations personnellement identifiables qui
                                peuvent être utilisées pour vous contacter ou
                                vous identifier. Les informations
                                personnellement identifiables peuvent inclure,
                                mais ne sont pas limitées à :
                            </p>
                            <ul>
                                <li>
                                    <p>Adresse électronique</p>
                                </li>
                                <li>
                                    <p>Données d'Utilisation</p>
                                </li>
                            </ul>
                            <h3>Données d'Utilisation</h3>
                            <p>
                                Les Données d'Utilisation sont collectées
                                automatiquement lors de l'utilisation du Service
                            </p>
                            <p>
                                Les Données d'Utilisation peuvent inclure des
                                informations telles l'Adresse de Protocole
                                Internet de Votre Appareil (e.g. adresse IP), le
                                type de navigateur, la version du navigateur,
                                les pages de notre Service que Vous visitez,
                                l'heure et la date de Votre visite, le temps
                                passé sur ces pages, les identifiants uniques
                                des appareils et d'autres données de diagnosic.
                            </p>
                            <p>
                                Lorsque Vous accédez au Service par ou via un
                                appareil mobile, Nous pouvons recueillir
                                automatiquement certaines informations y
                                compris, mais sans s'y limiter, le type
                                d'appareil mobile que Vous utilisez,
                                l'Identifiant unique de Votre appareil mobile,
                                l'adresse IP de Votre appareil mobile, le
                                système d'exploitation de Votre appareil mobile,
                                le type de navigateur Internet que Vous
                                utilisez, les identifiants uniques de l'appareil
                                et d'autres données de diagnostic.
                            </p>
                            <p>
                                Nous pouvons également recueillir les
                                informations que Votre navigateur envoie lorsque
                                Vous visitez notre Service ou lorsque vous
                                accédez par ou via un appareil mobile.
                            </p>
                            <h3>Technologies de suivi et Cookies</h3>
                            <p>
                                Nous utilisons des cookies et des technologies
                                de suivi similaires pour suivre l'activité sur
                                Notre Service et stocker certaines informations.
                                Les technologies de suivi utilisées sont des
                                balises, des marqueurs et des scripts pour
                                collecter et suivre des informations et pour
                                améliorer et analyser Notre Service. Les
                                technologies que nous utilisons peuvent inclure
                                :
                            </p>
                            <ul>
                                <li>
                                    <strong>
                                        Cookies ou Cookies de Navigateur.
                                    </strong>{' '}
                                    Un cookie est un petit fichier placé sur
                                    Votre Appareil. Vous pouvez demander à Votre
                                    navigateur de refuser tous les Cookies ou
                                    d'indiquer quand un Cookie est envoyé.
                                    Toutefois, si Vous n'acceptez pas les
                                    Cookies, il se peut que Vous ne puissiez pas
                                    utiliser certaines parties de notre Service.
                                    À moins que Vous n'ayez réglé les paramètres
                                    de Votre navigateur pour qu'il refuse les
                                    Cookies, notre Service peut utiliser des
                                    Cookies.
                                </li>
                                <li>
                                    <strong>Flash Cookies.</strong> Certaines
                                    fonctionnalités de notre Service peuvent
                                    utiliser des objets stockés localement (ou
                                    Flash Cookies) pour collecter et stocker des
                                    informations sur Vos préférences ou Votre
                                    activité sur notre Service. Les Cookies
                                    Flash ne sont pas gérés par les mêmes
                                    paramètres de navigateur que ceux utilisés
                                    pour les Cookies de navigateur. Pour plus
                                    d'informations sur la manière dont Vous
                                    pouvez supprimer les Cookies Flash, veuillez
                                    lire &quot;Où puis-je modifier les
                                    paramètres de désactivation ou de
                                    suppression des objets locaux partagés
                                    ?&quot; disponible à l'adresse suivante :{' '}
                                    <br />
                                    <a
                                        href="https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_"
                                        rel="external nofollow noopener noreferrer"
                                        target="_blank"
                                    >
                                        https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main_Where_can_I_change_the_settings_for_disabling__or_deleting_local_shared_objects_
                                    </a>
                                </li>
                                <li>
                                    <strong>Balises Web.</strong> Certaines
                                    sections de notre Service et de nos
                                    courriels peuvent contenir de petits
                                    fichiers électroniques connus sous le nom de
                                    balises Web (également appelées gifs
                                    invisibles, balises pixel et gifs à pixel
                                    unique) qui permettent à la Société, par
                                    exemple, de compter les utilisateurs qui ont
                                    visité ces pages ou ouvert un courriel et de
                                    réaliser d'autres statistiques relatives au
                                    site Web (par exemple, enregistrer la
                                    popularité d'une certaine section et
                                    vérifier l'intégrité du système et du
                                    serveur).
                                </li>
                            </ul>
                            <p>
                                Les Cookies peuvent être des Cookies
                                &quot;Persistants&quot; ou des Cookies &quot;de
                                Session&quot;. Les Cookies Persistants restent
                                sur Votre ordinateur personnel ou appareil
                                mobile lorsque Vous vous déconnectez, tandis que
                                les Cookies de Session sont supprimés dès que
                                Vous fermez le navigateur web. En savoir plus
                                sur les cookies :{' '}
                                <a
                                    href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Cookies par PrivacyPolicies Generator
                                </a>
                                .
                            </p>
                            <p>
                                Nous utilisons des Cookies de Session et des
                                Cookies Persistants aux fins énoncées ci-dessous
                                :
                            </p>
                            <ul>
                                <li>
                                    <p>
                                        <strong>
                                            Cookies Nécessaires / Essentiels
                                        </strong>
                                    </p>
                                    <p>Type: Cookies de Session</p>
                                    <p>Administré par: Nous</p>
                                    <p>
                                        Objectif : Ces Cookies sont essentiels
                                        pour Vous fournir les services
                                        disponibles par l'intermédiaire du Site
                                        Web et pour Vous permettre d'utiliser
                                        certaines de ses fonctionnalités. Ils
                                        aident à authentifier les utilisateurs
                                        et à empêcher l'utilisation frauduleuse
                                        des comptes d'utilisateurs. Sans ces
                                        cookies, les services que Vous avez
                                        demandés ne peuvent pas être fournis, et
                                        Nous n'utilisons ces Cookies que pour
                                        Vous fournir ces services.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            Politique en matière de Cookies /
                                            Acceptation de l'avis Cookies
                                        </strong>
                                    </p>
                                    <p>Type : Cookies Persistants</p>
                                    <p>Administré par: Nous</p>
                                    <p>
                                        Objectif : Ces Cookies permettent
                                        d'identifier si les utilisateurs ont
                                        accepté l'utilisation de cookies sur le
                                        Site Web.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            Cookies de Fonctionnalité
                                        </strong>
                                    </p>
                                    <p>Type: Cookies Persistants</p>
                                    <p>Administré par: Nous</p>
                                    <p>
                                        Objectif : Ces Cookies nous permettent
                                        de nous souvenir des choix que Vous
                                        faites lorsque vous utilisez le Site
                                        Web, comme la mémorisation de vos
                                        données de connexion ou de vos
                                        préférences linguistiques. L'objectif de
                                        ces Cookies est de Vous offrir une
                                        expérience plus personnelle et de Vous
                                        éviter de devoir saisir à nouveau vos
                                        préférences chaque fois que vous
                                        utilisez le Site Web.
                                    </p>
                                </li>
                            </ul>
                            <p>
                                Pour plus d'informations sur les Cookies que
                                nous utilisons et vos choix en matière de
                                Cookies, veuillez consulter notre Politique en
                                matière de Cookies ou la section Cookies de
                                notre Politique de Confidentialité.
                            </p>
                            <h2>Utilisation de Vos Données Personnelles</h2>
                            <p>
                                La Compagnie peut utiliser les Données
                                Personnelles aux fins suivantes :
                            </p>
                            <ul>
                                <li>
                                    <p>
                                        <strong>
                                            Pour fournir et maintenir notre
                                            Service
                                        </strong>
                                        , notamment pour surveiller
                                        l'utilisation de notre Service.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            Pour gérer Votre Compte :
                                        </strong>{' '}
                                        pour gérer Votre inscription en tant
                                        qu'utilisateur du Service. Les Données
                                        Personnelles que Vous fournissez peuvent
                                        Vous donner accès à différentes
                                        fonctionnalités du Service qui Vous sont
                                        accessibles en tant qu'utilisateur
                                        enregistré.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            Pour l'exécution d'un contrat :
                                        </strong>{' '}
                                        l'élaboration, le respect et
                                        l'engagement du contrat d'achat pour les
                                        produits, articles ou services que Vous
                                        avez acheté ou de tout autre contrat
                                        avec Nous par le biais du Service.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Pour vous contacter :</strong>{' '}
                                        Vous contacter par courrier
                                        électronique, appels téléphoniques, SMS
                                        ou autres formes équivalentes de
                                        communication électronique, telles que
                                        les notifications push d'une application
                                        mobile concernant les mises à jour ou
                                        les communications informatives liées
                                        aux fonctionnalités, produits ou
                                        services contractuels, y compris les
                                        mises à jour de sécurité, lorsque cela
                                        est nécessaire ou raisonnable pour leur
                                        mise en œuvre.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Pour Vous fournir</strong> des
                                        nouvelles, des offres spéciales et des
                                        informations générales sur d'autres
                                        biens, services et événements que nous
                                        proposons et qui sont similaires à ceux
                                        que vous avez déjà achetés ou sur
                                        lesquels vous vous êtes renseigné, sauf
                                        si Vous avez choisi de ne pas recevoir
                                        ces informations.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            Pour gérer Vos demandes :
                                        </strong>{' '}
                                        Pour répondre et gérer les demandes que
                                        Vous Nous adressez.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>
                                            Pour les transferts d'entreprises :
                                        </strong>{' '}
                                        Nous pouvons utiliser Vos informations
                                        pour évaluer ou mener une fusion, un
                                        désinvestissement, une restructuration,
                                        une réorganisation, une dissolution ou
                                        toute autre vente ou transfert de tout
                                        ou partie de Nos actifs, que ce soit
                                        dans le cadre d'une poursuite d'activité
                                        ou d'une faillite, d'une liquidation ou
                                        d'une procédure similaire, dans laquelle
                                        les Données personnelles que Nous
                                        détenons sur les utilisateurs de nos
                                        Services font partie des actifs
                                        transférés.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>À d'autres fins</strong>: Nous
                                        pouvons utiliser Vos informations à
                                        d'autres fins, telles que l'analyse des
                                        données, l'identification des tendances
                                        d'utilisation, la détermination de
                                        l'efficacité de nos campagnes
                                        promotionnelles et l'évaluation et
                                        l'amélioration de notre Service, de nos
                                        produits, de nos services, de notre
                                        marketing et de votre expérience.
                                    </p>
                                </li>
                            </ul>
                            <p>
                                Nous pouvons partager vos informations
                                personnelles dans les situations suivantes :
                            </p>
                            <ul>
                                <li>
                                    <strong>
                                        Avec les Fournisseurs de Services :
                                    </strong>{' '}
                                    Nous pouvons partager Vos informations
                                    personnelles avec les Fournisseurs de
                                    Services pour surveiller et analyser
                                    l'utilisation de notre Service, pour Vous
                                    contacter.
                                </li>
                                <li>
                                    <strong>
                                        Pour les transferts d'entreprises :
                                    </strong>{' '}
                                    Nous pouvons partager ou transférer Vos
                                    informations personnelles dans le cadre ou
                                    au cours des négociations d'une fusion, de
                                    la vente des actifs de la Compagnie, d'un
                                    financement ou de l'acquisition de tout ou
                                    partie de Nos activités par une autre
                                    société.
                                </li>
                                <li>
                                    <strong>Avec des affiliés :</strong> Nous
                                    pouvons partager Vos informations avec Nos
                                    sociétés affiliées, auquel cas nous
                                    demanderons à ces sociétés affiliées de
                                    respecter la présente Politique de
                                    Confidentialité. Les sociétés affiliées
                                    comprennent Notre société mère et toute
                                    autre filiale, partenaire de coentreprise ou
                                    autre société que Nous contrôlons ou qui est
                                    sous contrôle commun avec Nous.
                                </li>
                                <li>
                                    <strong>
                                        Avec d'autres utilisateurs :
                                    </strong>
                                    lorsque Vous partagez des informations
                                    personnelles ou interagissez de toute autre
                                    manière dans les zones publiques avec
                                    d'autres utilisateurs, ces informations
                                    peuvent être vues par tous les utilisateurs
                                    et peuvent être diffusées publiquement à
                                    l'extérieur.
                                </li>
                                <li>
                                    <strong>Avec Votre consentement</strong>:
                                    Nous pouvons divulguer vos informations
                                    personnelles à toute autre fin avec Votre
                                    consentement.
                                </li>
                            </ul>
                            <StyledH2>
                                Conservation de Vos Données Personnelles
                            </StyledH2>
                            <p>
                                La Société ne conservera Vos Données
                                Personnelles que pendant la durée nécessaire aux
                                fins énoncées dans la présente Politique de
                                Confidentialité. Nous conserverons et
                                utiliserons Vos Données personnelles dans la
                                mesure nécessaire pour nous conformer à nos
                                obligations légales (par exemple, si nous sommes
                                tenus de conserver vos données pour nous
                                conformer aux lois applicables), résoudre les
                                litiges et appliquer nos accords et politiques
                                juridiques.
                            </p>
                            <p>
                                La Société conservera également les Données
                                d'Utilisation à des fins d'analyse interne. Les
                                Données d'utilisation sont généralement
                                conservées pendant une période plus courte, sauf
                                si ces données sont utilisées pour renforcer la
                                sécurité ou améliorer la fonctionnalité de Notre
                                Service, ou si Nous sommes légalement obligés de
                                conserver ces données pendant des périodes plus
                                longues.
                            </p>
                            <StyledH2>
                                Transfert de Vos Données Personnelles
                            </StyledH2>
                            <p>
                                Vos informations, y compris les Données
                                Personnelles, sont traitées dans les bureaux
                                d'exploitation de la Société et stockés dans les
                                serveurs de Firebase en Belgique. Cela signifie
                                que ces informations peuvent être transférées
                                vers - et conservées sur - des ordinateurs
                                situés en dehors de votre état, province, pays
                                ou autre juridiction gouvernementale où les lois
                                de protection des données peuvent différer de
                                celles de votre juridiction.
                            </p>
                            <p>
                                Votre consentement à la présente Politique de
                                Confidentialité, suivi de Votre soumission de
                                ces informations, représente Votre accord à ce
                                transfert.
                            </p>
                            <p>
                                La Société prendra toutes les mesures
                                raisonnablement nécessaires pour s'assurer que
                                Vos données sont traitées en toute sécurité et
                                conformément à la présente Politique de
                                Confidentialité et aucun transfert de Vos
                                Données Personnelles n'aura lieu vers une
                                organisation ou un pays à moins qu'il n'y ait
                                des contrôles adéquats en place, y compris la
                                sécurité de Vos données et autres informations
                                personnelles.
                            </p>
                            <StyledH2>
                                Divulgation de Vos Données Personnelles
                            </StyledH2>
                            <h3>Transactions Commerciales</h3>
                            <p>
                                Si la Société est impliquée dans une fusion,
                                acquisition ou vente d'actifs, Vos Données
                                Personnelles peuvent être transférées. Nous
                                fournirons un avis avant que Vos Données
                                Personnelles ne soient transférées et deviennent
                                soumises à une Politique de Confidentialité
                                différente.
                            </p>
                            <h3>Application de la loi</h3>
                            <p>
                                Dans certaines circonstances, la Société peut
                                être tenue de divulguer Vos Données Personnelles
                                si la loi l'exige ou en réponse à des demandes
                                valables des autorités publiques (par exemple,
                                un tribunal ou une agence gouvernementale).
                            </p>
                            <h3>Autres exigences légales</h3>
                            <p>
                                La Société peut divulguer Vos Données
                                Personnelles si elle croit de bonne foi qu'une
                                telle action est nécessaire pour :
                            </p>
                            <ul>
                                <li>Se conformer à une obligation légale</li>
                                <li>
                                    Protéger et défendre les droits ou les biens
                                    de la Société
                                </li>
                                <li>
                                    Prévenir ou enquêter sur d'éventuels actes
                                    répréhensibles en rapport avec le Service
                                </li>
                                <li>
                                    Protéger la sécurité personnelle des
                                    Utilisateurs du Service ou du public
                                </li>
                                <li>
                                    Protéger contre la responsabilité juridique
                                </li>
                            </ul>
                            <StyledH2>
                                Sécurité de Vos Données Personnelles
                            </StyledH2>
                            <p>
                                La sécurité de Vos Données Personnelles est
                                importante pour Nous, mais n'oubliez pas
                                qu'aucune méthode de transmission sur Internet
                                ou de stockage électronique n'est sûre à 100 %.
                                Bien que Nous nous efforcions d'utiliser des
                                moyens commercialement acceptables pour protéger
                                Vos Données Personnelles, Nous ne pouvons pas
                                garantir leur sécurité absolue.
                            </p>
                        </StyledSection>
                        <StyledSection>
                            <h1>Vie Privée des enfants</h1>
                            <p>
                                Notre Service ne s'adresse pas aux personnes
                                âgées de moins de 13 ans. Nous ne recueillons
                                pas sciemment d'informations personnellement
                                identifiables auprès de personnes âgées de moins
                                de 13 ans. Si Vous êtes un parent ou un tuteur
                                et que Vous savez que votre enfant Nous a fourni
                                des Données Personnelles, veuillez nous
                                contacter. Si Nous nous rendons compte que Nous
                                avons collecté des données personnelles auprès
                                de personnes âgées de moins de 13 ans sans
                                vérification du consentement parental, Nous
                                prenons des mesures pour supprimer ces
                                informations de Nos serveurs.
                            </p>
                            <p>
                                Si Nous devons nous appuyer sur le consentement
                                comme base juridique pour traiter Vos
                                informations et que Votre pays exige le
                                consentement d'un parent, Nous pouvons exiger le
                                consentement de Votre parent avant de recueillir
                                et d'utiliser ces informations.
                            </p>
                        </StyledSection>
                        <StyledSection>
                            <h1>Liens vers d'autres Sites Web</h1>
                            <p>
                                Notre Service peut contenir des liens vers
                                d'autres sites web qui ne sont pas exploités par
                                Nous. Si vous cliquez sur un lien tiers, vous
                                serez dirigé vers le site de ce tiers. Nous vous
                                conseillons vivement de consulter la Politique
                                de Confidentialité de chaque site que vous
                                visitez.
                            </p>
                            <p>
                                Nous n'avons aucun contrôle et n'assumons aucune
                                responsabilité quant au contenu, aux politiques
                                de confidentialité ou aux pratiques de tout site
                                ou service tiers.
                            </p>
                        </StyledSection>
                        <StyledSection>
                            <h1>
                                Modifications de la présente Politique de
                                Confidentialité
                            </h1>
                            <p>
                                Nous pouvons mettre à jour notre Politique de
                                Confidentialité de temps à autre. Nous Vous
                                informerons de toute modification en publiant la
                                nouvelle Politique de Confidentialité sur cette
                                page.
                            </p>
                            <p>
                                Nous Vous en informerons par e-mail et/ou par un
                                avis bien visible sur Notre Service, avant que
                                la modification ne prenne effet et nous mettrons
                                à jour la date de &quot; dernière mise à jour et
                                entrée en vigeur &quot; en haut de la présente
                                Politique de Confidentialité.
                            </p>
                            <p>
                                Nous Vous conseillons de consulter régulièrement
                                cette Politique de Confidentialité pour prendre
                                connaissance des éventuelles modifications. Les
                                modifications apportées à cette Politique de
                                Confidentialité entrent en vigueur lorsqu'elles
                                sont publiées sur cette page.
                            </p>
                        </StyledSection>
                        <StyledSection>
                            <h1>Nous contacter</h1>
                            <p>
                                Si vous avez des questions sur cette Politique
                                de Confidentialité, vous pouvez nous contacter :
                            </p>
                            <ul>
                                <li>
                                    Par e-mail: pando.contact.mayeux@gmail.com
                                </li>
                            </ul>
                        </StyledSection>
                        <StyledSection>
                            An english version of Our Privacy Policiy is host by{' '}
                            <a
                                href="https://www.privacypolicies.com/blog/privacy-policy-template/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Privacy Policy Template
                            </a>{' '}
                            on{' '}
                            <a
                                href="https://www.privacypolicies.com/live/4157ce29-3186-4f21-b0e2-3fb3212baf5d"
                                target={'_blank'}
                                rel="noreferrer"
                            >
                                https://www.privacypolicies.com/live/4157ce29-3186-4f21-b0e2-3fb3212baf5d
                            </a>
                        </StyledSection>
                    </HomePage>
                </div>
                <WaveJoin />
                <Footer />
            </StyledLoginPage>
        </>
    )
}

export default Privacy
