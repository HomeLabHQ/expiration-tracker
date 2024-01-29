```dot
digraph model_graph {
  // Dotfile by Django-Extensions graph_models
  // Created: 2024-01-28 17:45
  // Cli Options: -a -g -o docs/database/database.dot

  fontname = "Roboto"
  fontsize = 8
  splines  = true
  rankdir = "TB"

  node [
    fontname = "Roboto"
    fontsize = 8
    shape = "plaintext"
  ]

  edge [
    fontname = "Roboto"
    fontsize = 8
  ]

  // Labels
  subgraph cluster_django_contrib_admin {
    label=<
          <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
          <TR><TD COLSPAN="2" CELLPADDING="4" ALIGN="CENTER">
          <FONT FACE="Roboto" COLOR="Black" POINT-SIZE="10">
          <B>django.contrib.admin</B>
          </FONT>
          </TD></TR>
          </TABLE>
          >
    color=olivedrab4
    style="rounded"

    django_contrib_admin_models_LogEntry [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      LogEntry
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><B>id</B></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><B>AutoField</B></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT COLOR="#7B7B7B" FACE="Roboto"><B>content_type</B></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT COLOR="#7B7B7B" FACE="Roboto"><B>ForeignKey (id)</B></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><B>user</B></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><B>ForeignKey (id)</B></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">action_flag</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">PositiveSmallIntegerField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">action_time</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">DateTimeField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT COLOR="#7B7B7B" FACE="Roboto">change_message</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT COLOR="#7B7B7B" FACE="Roboto">TextField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT COLOR="#7B7B7B" FACE="Roboto">object_id</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT COLOR="#7B7B7B" FACE="Roboto">TextField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">object_repr</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">CharField</FONT>
      </TD></TR>


      </TABLE>
      >]

  }
  subgraph cluster_django_contrib_auth {
    label=<
          <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
          <TR><TD COLSPAN="2" CELLPADDING="4" ALIGN="CENTER">
          <FONT FACE="Roboto" COLOR="Black" POINT-SIZE="10">
          <B>django.contrib.auth</B>
          </FONT>
          </TD></TR>
          </TABLE>
          >
    color=olivedrab4
    style="rounded"

    django_contrib_auth_models_Permission [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      Permission
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><B>id</B></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><B>AutoField</B></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><B>content_type</B></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><B>ForeignKey (id)</B></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">codename</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">CharField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">name</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">CharField</FONT>
      </TD></TR>


      </TABLE>
      >]

    django_contrib_auth_models_Group [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      Group
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><B>id</B></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><B>AutoField</B></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">name</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">CharField</FONT>
      </TD></TR>


      </TABLE>
      >]

  }
  subgraph cluster_django_contrib_contenttypes {
    label=<
          <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
          <TR><TD COLSPAN="2" CELLPADDING="4" ALIGN="CENTER">
          <FONT FACE="Roboto" COLOR="Black" POINT-SIZE="10">
          <B>django.contrib.contenttypes</B>
          </FONT>
          </TD></TR>
          </TABLE>
          >
    color=olivedrab4
    style="rounded"

    django_contrib_contenttypes_models_ContentType [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      ContentType
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><B>id</B></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><B>AutoField</B></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">app_label</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">CharField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">model</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">CharField</FONT>
      </TD></TR>


      </TABLE>
      >]

  }
  subgraph cluster_django_contrib_sessions {
    label=<
          <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
          <TR><TD COLSPAN="2" CELLPADDING="4" ALIGN="CENTER">
          <FONT FACE="Roboto" COLOR="Black" POINT-SIZE="10">
          <B>django.contrib.sessions</B>
          </FONT>
          </TD></TR>
          </TABLE>
          >
    color=olivedrab4
    style="rounded"

    django_contrib_sessions_base_session_AbstractBaseSession [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      AbstractBaseSession
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">expire_date</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">DateTimeField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">session_data</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">TextField</FONT>
      </TD></TR>


      </TABLE>
      >]

    django_contrib_sessions_models_Session [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      Session<BR/>&lt;<FONT FACE="Roboto"><I>AbstractBaseSession</I></FONT>&gt;
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><I><B>session_key</B></I></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><I><B>CharField</B></I></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><I>expire_date</I></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><I>DateTimeField</I></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><I>session_data</I></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><I>TextField</I></FONT>
      </TD></TR>


      </TABLE>
      >]

  }
  subgraph cluster_authentication {
    label=<
          <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
          <TR><TD COLSPAN="2" CELLPADDING="4" ALIGN="CENTER">
          <FONT FACE="Roboto" COLOR="Black" POINT-SIZE="10">
          <B>authentication</B>
          </FONT>
          </TD></TR>
          </TABLE>
          >
    color=olivedrab4
    style="rounded"

    django_contrib_auth_base_user_AbstractBaseUser [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      AbstractBaseUser
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT COLOR="#7B7B7B" FACE="Roboto">last_login</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT COLOR="#7B7B7B" FACE="Roboto">DateTimeField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">password</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">CharField</FONT>
      </TD></TR>


      </TABLE>
      >]

    django_contrib_auth_models_PermissionsMixin [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      PermissionsMixin
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">is_superuser</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">BooleanField</FONT>
      </TD></TR>


      </TABLE>
      >]

    authentication_models_User [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      User<BR/>&lt;<FONT FACE="Roboto"><I>AbstractBaseUser,PermissionsMixin</I></FONT>&gt;
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><B>id</B></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><B>BigAutoField</B></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">email</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">EmailField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">first_name</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">CharField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">is_active</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">BooleanField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">is_staff</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">BooleanField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">is_superuser</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">BooleanField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT COLOR="#7B7B7B" FACE="Roboto"><I>last_login</I></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT COLOR="#7B7B7B" FACE="Roboto"><I>DateTimeField</I></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">last_name</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">CharField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><I>password</I></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><I>CharField</I></FONT>
      </TD></TR>


      </TABLE>
      >]

  }
  subgraph cluster_items {
    label=<
          <TABLE BORDER="0" CELLBORDER="0" CELLSPACING="0">
          <TR><TD COLSPAN="2" CELLPADDING="4" ALIGN="CENTER">
          <FONT FACE="Roboto" COLOR="Black" POINT-SIZE="10">
          <B>items</B>
          </FONT>
          </TD></TR>
          </TABLE>
          >
    color=olivedrab4
    style="rounded"

    core_models_TimeStampedModel [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      TimeStampedModel
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT COLOR="#7B7B7B" FACE="Roboto">created_at</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT COLOR="#7B7B7B" FACE="Roboto">DateTimeField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT COLOR="#7B7B7B" FACE="Roboto">updated_at</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT COLOR="#7B7B7B" FACE="Roboto">DateTimeField</FONT>
      </TD></TR>


      </TABLE>
      >]

    core_models_TitleModel [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      TitleModel
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">title</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">CharField</FONT>
      </TD></TR>


      </TABLE>
      >]

    core_models_TitleDescriptionModel [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      TitleDescriptionModel<BR/>&lt;<FONT FACE="Roboto"><I>TitleModel,DescriptionModel</I></FONT>&gt;
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT COLOR="#7B7B7B" FACE="Roboto"><I>description</I></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT COLOR="#7B7B7B" FACE="Roboto"><I>TextField</I></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><I>title</I></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><I>CharField</I></FONT>
      </TD></TR>


      </TABLE>
      >]

    items_models_Location [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      Location<BR/>&lt;<FONT FACE="Roboto"><I>TitleDescriptionModel</I></FONT>&gt;
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><B>id</B></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><B>BigAutoField</B></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT COLOR="#7B7B7B" FACE="Roboto"><I>description</I></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT COLOR="#7B7B7B" FACE="Roboto"><I>TextField</I></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><I>title</I></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><I>CharField</I></FONT>
      </TD></TR>


      </TABLE>
      >]

    items_models_Item [label=<
      <TABLE BGCOLOR="white" BORDER="1" CELLBORDER="0" CELLSPACING="0">
      <TR><TD COLSPAN="2" CELLPADDING="5" ALIGN="CENTER" BGCOLOR="#1b563f">
      <FONT FACE="Roboto" COLOR="white" POINT-SIZE="10"><B>
      Item<BR/>&lt;<FONT FACE="Roboto"><I>TimeStampedModel,TitleModel</I></FONT>&gt;
      </B></FONT></TD></TR>


      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><B>id</B></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><B>BigAutoField</B></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><B>location</B></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><B>ForeignKey (id)</B></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">category</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">CharField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT COLOR="#7B7B7B" FACE="Roboto"><I>created_at</I></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT COLOR="#7B7B7B" FACE="Roboto"><I>DateTimeField</I></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">expiration_date</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">DateField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">opening_date</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">DateField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto">status</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto">CharField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT FACE="Roboto"><I>title</I></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT FACE="Roboto"><I>CharField</I></FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT COLOR="#7B7B7B" FACE="Roboto">upc</FONT>
      </TD><TD ALIGN="LEFT">
      <FONT COLOR="#7B7B7B" FACE="Roboto">CharField</FONT>
      </TD></TR>



      <TR><TD ALIGN="LEFT" BORDER="0">
      <FONT COLOR="#7B7B7B" FACE="Roboto"><I>updated_at</I></FONT>
      </TD><TD ALIGN="LEFT">
      <FONT COLOR="#7B7B7B" FACE="Roboto"><I>DateTimeField</I></FONT>
      </TD></TR>


      </TABLE>
      >]

  }


  // Relations

  django_contrib_admin_models_LogEntry -> authentication_models_User
  [label=" user (logentry)"] [arrowhead=none, arrowtail=dot, dir=both];

  django_contrib_admin_models_LogEntry -> django_contrib_contenttypes_models_ContentType
  [label=" content_type (logentry)"] [arrowhead=none, arrowtail=dot, dir=both];


  django_contrib_auth_models_Permission -> django_contrib_contenttypes_models_ContentType
  [label=" content_type (permission)"] [arrowhead=none, arrowtail=dot, dir=both];

  django_contrib_auth_models_Group -> django_contrib_auth_models_Permission
  [label=" permissions (group)"] [arrowhead=dot arrowtail=dot, dir=both];



  django_contrib_sessions_models_Session -> django_contrib_sessions_base_session_AbstractBaseSession
  [label=" abstract\ninheritance"] [arrowhead=empty, arrowtail=none, dir=both];


  authentication_models_User -> django_contrib_auth_models_Group
  [label=" groups (user)"] [arrowhead=dot arrowtail=dot, dir=both];

  authentication_models_User -> django_contrib_auth_models_Permission
  [label=" user_permissions (user)"] [arrowhead=dot arrowtail=dot, dir=both];

  authentication_models_User -> django_contrib_auth_base_user_AbstractBaseUser
  [label=" abstract\ninheritance"] [arrowhead=empty, arrowtail=none, dir=both];

  authentication_models_User -> django_contrib_auth_models_PermissionsMixin
  [label=" abstract\ninheritance"] [arrowhead=empty, arrowtail=none, dir=both];


  core_models_TitleDescriptionModel -> core_models_TitleModel
  [label=" abstract\ninheritance"] [arrowhead=empty, arrowtail=none, dir=both];
  core_models_DescriptionModel [label=<
  <TABLE BGCOLOR="white" BORDER="0" CELLBORDER="0" CELLSPACING="0">
  <TR><TD COLSPAN="2" CELLPADDING="4" ALIGN="CENTER" BGCOLOR="#1b563f">
  <FONT FACE="Roboto" POINT-SIZE="12" COLOR="white">DescriptionModel</FONT>
  </TD></TR>
  </TABLE>
  >]
  core_models_TitleDescriptionModel -> core_models_DescriptionModel
  [label=" abstract\ninheritance"] [arrowhead=empty, arrowtail=none, dir=both];

  items_models_Location -> core_models_TitleDescriptionModel
  [label=" abstract\ninheritance"] [arrowhead=empty, arrowtail=none, dir=both];

  items_models_Item -> items_models_Location
  [label=" location (item)"] [arrowhead=none, arrowtail=dot, dir=both];

  items_models_Item -> core_models_TimeStampedModel
  [label=" abstract\ninheritance"] [arrowhead=empty, arrowtail=none, dir=both];

  items_models_Item -> core_models_TitleModel
  [label=" abstract\ninheritance"] [arrowhead=empty, arrowtail=none, dir=both];


}
```
