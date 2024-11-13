"\"/*\\n * Copyright 2020 ForgeRock AS. All Rights Reserved\\n *\\n * Use of this code requires a commercial software license with ForgeRock AS.\\n * or with one of its affiliates. All use shall be exclusively subject\\n * to such license between the licensee and ForgeRock AS.\\n */\\n\\nimport static org.forgerock.json.JsonValue.field\\nimport static org.forgerock.json.JsonValue.json\\nimport static org.forgerock.json.JsonValue.object\\n\\nreturn json(object(\\n        field(\\\"id\\\", rawProfile.sub),\\n        field(\\\"displayName\\\", rawProfile.name),\\n        field(\\\"givenName\\\", rawProfile.given_name),\\n        field(\\\"familyName\\\", rawProfile.family_name),\\n        field(\\\"photoUrl\\\", rawProfile.picture),\\n        field(\\\"email\\\", rawProfile.email),\\n        field(\\\"username\\\", rawProfile.email),\\n        field(\\\"locale\\\", rawProfile.locale)))\"\n"
