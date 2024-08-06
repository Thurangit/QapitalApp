import { useState, useEffect, React } from "react";
import Index from "../views/dashboard/index";
// import { Switch, Route } from 'react-router-dom'
// user
import UserProfile from "../views/dashboard/app/user-profile";
import UserAdd from "../views/dashboard/app/user-add";
import UserList from "../views/dashboard/app/user-list";
// import userProfileEdit from '../views/dashboard/app/user-privacy-setting';
// widget
import Widgetbasic from "../views/dashboard/widget/widgetbasic";
import Widgetcard from "../views/dashboard/widget/widgetcard";
import Widgetchart from "../views/dashboard/widget/widgetchart";
// icon
import Solid from "../views/dashboard/icons/solid";
import Outline from "../views/dashboard/icons/outline";
import DualTone from "../views/dashboard/icons/dual-tone";
// Form
import FormElement from "../views/dashboard/from/form-element";
import FormValidation from "../views/dashboard/from/form-validation";
import FormWizard from "../views/dashboard/from/form-wizard";
// table
import BootstrapTable from "../views/dashboard/table/bootstrap-table";
import TableData from "../views/dashboard/table/table-data";

// map
import Vector from "../views/dashboard/maps/vector";
import Google from "../views/dashboard/maps/google";

//extra
// import PrivacyPolicy from '../views/dashboard/extra/privacy-policy';
// import TermsofService from '../views/dashboard/extra/terms-of-service';

//TransitionGroup
// import { TransitionGroup, CSSTransition } from "react-transition-group";
//Special Pages
import Billing from "../views/dashboard/special-pages/billing";
import Kanban from "../views/dashboard/special-pages/kanban";
import Pricing from "../views/dashboard/special-pages/pricing";
import Timeline from "../views/dashboard/special-pages/timeline";
import Calender from "../views/dashboard/special-pages/calender";
import RtlSupport from "../views/dashboard/special-pages/RtlSupport";

//admin
import Admin from "../views/dashboard/admin/admin";
import Default from "../layouts/dashboard/default";

//:::::::::::::::::::::::::::::::::::Epargne
import ActivitiesList from "../views/activities/activities_list";
import EpargneList from "../views/activities/epargnes/index";
import EpargneDetails from "../views/activities/epargnes/details";
import EpargneRegist from "../views/activities/epargnes/registactivite";
import ListEpargnesOfUser from "../views/activities/epargnes/listepargnesofuser";
import DetailEpargneOfUser from "../views/activities/epargnes/detailepargnesofuser";
//:::::::::::::::::::::::::::::::::::Epargne

//:::::::::::::::::::::::::::::::::::IA
import AssistantIA from "../views/ia/assistantIA";
//:::::::::::::::::::::::::::::::::::IA

import ProfileUser from "../views/user/profil";

//:::::::::::::::::::::::::::::::::::Associaton
import AssociationIndex from "../views/activities/associations";
import CreateAssociation from "../views/activities/associations/create_association";
import ListAssociationsOfUser from "../views/activities/associations/list_associations_of_user";
import DetailsAssociationsOfUsers from "../views/activities/associations/details_associations_of_user";
import ListCotisationsAssociationsOfUser from "../views/activities/associations/list_cotisations_associations_of_user";
import DetailCotisationOfUsers from "../views/activities/associations/details_cotisation_associations_of_user";
import AssociationsCotisationDetails from "../views/activities/associations/associations_cotisation_details";
import AssociationCotisationSendMoney from "../views/activities/associations/association_cotisation_sendmoney";
import MyActivitiesList from "../views/activities/my_activities_list";
import Documentset from "../views/user/documentset";
import AssociationCotisationTransactionsHistory from "../views/activities/associations/association_cotisation_transactions_history";
import AssociationAPropos from "../views/activities/associations/association_a_propos";
import SendMoneyOptions from "../views/transactions/sendmoney/sendmoney_menu";
import ReceiveMoneyOptions from "../views/transactions/receivemoney/receivemoney_menu";
import TransfertMoneyOptions from "../views/transactions/transfertmoney/transfertmoney_menu";
import AssociationReglement from "../views/activities/associations/association_reglement";
import AssociationFiles from "../views/activities/associations/association_fichiers";
import AssociationForum from "../views/activities/associations/association_forum";
import CotisationAPropos from "../views/activities/associations/cotisation_a_propos";
import EpargneAPropos from "../views/activities/associations/epargne_a_propos";
import DetailEpargneOfUsers from "../views/activities/associations/details_epargne_associations_of_user";
import EpargneTakeMoney from "../views/activities/associations/association_epargne_takemoney";
import paiementsOptions from "../views/transactions/paiements/options_paiements";
import SimpleSendMoney from "../views/transactions/sendmoney/simplesendmoney";
import ConfirmSendMoney from "../views/transactions/sendmoney/confirmsendmoney";
import PaiementsOptions from "../views/transactions/paiements/options_paiements";
import SendMoneyOperators from "../views/transactions/sendmoney/mobilemoneyoperatorsendmoney";
import ConfirmSendMoneyOperators from "../views/transactions/sendmoney/confirmobilemoneysendmoney";
import GiftChooseSendMoney from "../views/transactions/sendmoney/giftchoosesendmoney";
import GifThemeSendMoney from "../views/transactions/sendmoney/gifthemsendmoney";
import GiftAmountSendMoney from "../views/transactions/sendmoney/gitamountsendmoney";
import QrAmountSendMoney from "../views/transactions/sendmoney/qramountsendmoney";
import MembersOfAssociations from "../views/activities/associations/association_members";
import AssociationsInformationsMenu from "../views/activities/associations/association_informations_menu";
import AssociationEpargnesList from "../views/activities/associations/association_epargnes_list";
import AssociationForumsList from "../views/activities/associations/association_forums_list";
import GifsListChoise from "../views/transactions/sendmoney/giftchoiseslist";
import GifsParams from "../views/transactions/sendmoney/giftsparms";
import Loader from "../components/Loader";
import Leaflet from "../components/leaflet";
import PaiementsCreate from "../views/transactions/paiements/create_paye";
import PaiementsEnvoyer from "../views/transactions/paiements/iam_sender";
import PaiementsRecu from "../views/transactions/paiements/iam_payer";
import StatsGenerales from "../views/transactions/statistics/stats";
import FullHistory from "../views/transactions/history/fullhistory";
import ListGiftReceive from "../views/transactions/receivemoney/list_cadeaux_recus";
import ScanQR from "../views/transactions/receivemoney/scanqr";
//:::::::::::::::::::::::::::::::::::Associaton

//::::::::::::::::::::::::::::::::::Transactions

//::::::::::::::::::::::::::::::::::Transactions

export const DefaultRouter = [
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "",
        element: <Index />,
      },
      {
        path: "/dashboard",
        element: <Index />,
      },

      /////////////Transactions
      ///Send money
      {
        path: "Send/Money/Menu",
        element: <SendMoneyOptions />,
      },
      {
        path: "Simple/Send/Money",
        element: <SimpleSendMoney />,
      },
      {
        path: "Confirm/Send/Money/:idreceiver",
        element: <ConfirmSendMoney />,
      },
      ///Send money
      {
        path: "Receive/Money/Menu",
        element: <ReceiveMoneyOptions />,
      },
      {
        path: "Transfert/Money/Menu",
        element: <TransfertMoneyOptions />,
      },
      {
        path: "paiements/Options",
        element: <PaiementsOptions />,
      },
      {
        path: "Send/Money/Operators",
        element: <SendMoneyOperators />,
      },
      {
        path: "Send/Money/Operators/:operator",
        element: <ConfirmSendMoneyOperators />,
      },
      {
        path: "Gift/Send/Money",
        element: <GiftChooseSendMoney />,
      },
      {
        path: "Gift/Themes/Send/Money",
        element: <GifThemeSendMoney />,
      },
      {
        path: "Gift/Receive/List",
        element: <ListGiftReceive />,
      },

      {
        path: "QR/Amount/Send/Money",
        element: <QrAmountSendMoney />,
      },
      {
        path: "QR/Scan",
        element: <ScanQR />,
      },
      {
        path: "Gift/Amount/Send/Money/:idreceiver",
        element: <GiftAmountSendMoney />,
      },
      {
        path: "Gift/List/Themes/Send/Money/:idreceiver/:amount",
        element: <GifsListChoise />,
      },
      {
        path: "Gift/Details/:idreceiver/:amount/:idgift",
        element: <GifsParams />,
      },
      /////paiements
      {
        path: "Create/Pay",
        element: <PaiementsCreate />,
      },
      {
        path: "Pay/Sent",
        element: <PaiementsEnvoyer />,
      },
      {
        path: "Pay/Receive",
        element: <PaiementsRecu />,
      },

      ///Stats
      {
        path: "Stats/Transactions",
        element: <StatsGenerales />,
      },

      ////History

      {
        path: "History",
        element: <FullHistory />,
      },




      /////////////////Activies
      {
        path: "Activities/List",
        element: <ActivitiesList />,
      },
      {
        path: "My/Activities/List",
        element: <MyActivitiesList />,
      },
      //Epargnes
      {
        path: "Epargne/List",
        element: <EpargneList />,
      },
      {
        path: "Epargne/Details/:ref",
        element: <EpargneDetails />,
      },
      {
        path: "Regist/Epargne/:ref",
        element: <EpargneRegist />,
      },
      {
        path: "List/Epargnes",
        element: <ListEpargnesOfUser />,
      },
      {
        path: "Detail/Epargnes/:ref",
        element: <DetailEpargneOfUser />,
      },

      //Association
      {
        path: "Association",
        element: <AssociationIndex />,
      },
      {
        path: "Create/Association",
        element: <CreateAssociation />,
      },
      {
        path: "List/Association/Of/User",
        element: <ListAssociationsOfUser />,
      },
      {
        path: "Detail/Association/Of/User/:idassociation",
        element: <DetailsAssociationsOfUsers />,
      },
      {
        path: "Association/Forums/List/:idassociation",
        element: <AssociationForumsList />,
      },
      {
        path: "Association/List/Epargnes/:idassociation",
        element: <AssociationEpargnesList />,
      },
      {
        path: "/Association/Members/:idassociation",
        element: <MembersOfAssociations />,
      },
      {
        path: "/Association/Menu/:idassociation",
        element: <AssociationsInformationsMenu />,
      },
      {
        path: "List/Cotisations/Association/Of/User/:idassociation",
        element: <ListCotisationsAssociationsOfUser />,
      },
      {
        path: "Cotisation/:idassociation/:idcotisation",
        element: <DetailCotisationOfUsers />,
      },
      {
        path: "Epargne/:idassociation/:idepargne",
        element: <DetailEpargneOfUsers />,
      },
      {
        path: "Infos/Cotisation/:idassociation/:idcotisation",
        element: <CotisationAPropos />,
      },
      {
        path: "Infos/Epargne/:idassociation/:idepargne",
        element: <EpargneAPropos />,
      },
      {
        path: "Association/Cotisation/Send/Money/:idassociation/:idcotisation/:iduser/:idmember/:idsender",
        element: <AssociationCotisationSendMoney />,
      },
      {
        path: "Association/Epargne/Take/Money/:idassociation/:idepargne",
        element: <EpargneTakeMoney />,
      },
      {
        path: "Association/About/:idassociation",
        element: <AssociationAPropos />,
      },
      {
        path: "Association/Rules/:idassociation",
        element: <AssociationReglement />,
      },
      {
        path: "Association/Files/:idassociation",
        element: <AssociationFiles />,
      },
      {
        path: "Association/Cotisation/Transactions/History/:idassociation/:idcotisation",
        element: <AssociationCotisationTransactionsHistory />,
      },
      {
        path: "Association/Forum/:name_entity/:idassociation/:id_entity",
        element: <AssociationForum />,
      },

      ////IA
      {
        path: "Qapital/IA/",
        element: <AssistantIA />,
      },

      ////Profile User
      {
        path: "Profile",
        element: <ProfileUser />,
      },
      ////Profile User
      {
        path: "Set/Document/:document",
        element: <Documentset />,
      },

      {
        path: "dashboard/special-pages/billing",
        element: <Billing />,
      },
      {
        path: "dashboard/special-pages/calender",
        element: <Calender />,
      },
      {
        path: "dashboard/special-pages/kanban",
        element: <Kanban />,
      },
      {
        path: "dashboard/special-pages/pricing",
        element: <Pricing />,
      },
      {
        path: "dashboard/special-pages/timeline",
        element: <Timeline />,
      },
      {
        path: "dashboard/special-pages/rtl-support",
        element: <RtlSupport />,
      },
      {
        path: "dashboard/app/user-profile",
        element: <UserProfile />,
      },
      {
        path: "dashboard/app/user-add",
        element: <UserAdd />,
      },
      {
        path: "dashboard/app/user-list",
        element: <UserList />,
      },
      {
        path: "dashboard/admin/admin",
        element: <Admin />,
      },
      // Widget
      {
        path: "dashboard/widget/widgetbasic",
        element: <Widgetbasic />,
      },
      {
        path: "dashboard/widget/widgetchart",
        element: <Widgetchart />,
      },
      {
        path: "dashboard/widget/widgetcard",
        element: <Widgetcard />,
      },
      // Map
      {
        path: "dashboard/map/google",
        element: <Google />,
      },
      {
        path: "dashboard/map/vector",
        element: <Vector />,
      },
      // Form
      {
        path: "dashboard/form/form-element",
        element: <FormElement />,
      },
      {
        path: "dashboard/form/form-wizard",
        element: <FormWizard />,
      },
      {
        path: "dashboard/form/form-validation",
        element: <FormValidation />,
      },
      // Table
      {
        path: "dashboard/table/bootstrap-table",
        element: <BootstrapTable />,
      },
      {
        path: "dashboard/table/table-data",
        element: <TableData />,
      },
      // Icon
      {
        path: "dashboard/icon/solid",
        element: <Solid />,
      },
      {
        path: "dashboard/icon/outline",
        element: <Outline />,
      },
      {
        path: "dashboard/icon/dual-tone",
        element: <DualTone />,
      },

      {
        path: "dashboard/icon/loader",
        element: <Leaflet />,
      },



    ],
  },
];