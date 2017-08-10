/* eslint-disable */
module.exports = {
  "uiSchema": {
    "classNames": "moda-overview",
    "ui:order": [
      "title",
      "project",
      "fundingAgency",
      "grantNumberOrInformation",
      "projectHomePage",
      "author",
      "version",
      "userCase",
      "publications",
      "accessConditions",
      "workflowRationale",
      "creationDate",
      "modificationDate",
      "chainOfModels"
    ],
    "creationDate": {
      "ui:readonly": "true",
      "ui:widget": "hidden"
    },
    "modificationDate": {
      "ui:readonly": "true",
      "ui:widget": "hidden"
    },
    "title": {
      "classNames": "moda-title",
      "ui:help": "",
    },
    "version": {
      "ui:emptyValue": "Version 6"
    },
    "project": {
      "classNames": "moda-project",
      "ui:help": "",
    },
    "projectHomePage": {
      "ui:widget": "uri"
    },
    "author": {
      "email": {
        "ui:widget": "email"
      }
    },
    "userCase": {
      "classNames": "user-case",
      "ui:widget": "textarea",
      "ui:help": "Explain the user-case",
    },
    "publications": {
      "classNames": "publications",
      "ui:widget": "textarea",
    },
    "accessConditions": {
      "classNames": "access-conditions",
      "ui:widget": "textarea",
    },
    "workflowRationale": {
      "classNames": "workflow-rationale",
      "ui:widget": "textarea",
    },
    "chainOfModels": {
      "classNames": "chain-of-models",
      "physicsBasedModels": {
        "classNames": "physics-based-models",
        "ui:help": "Please identify the model. Note these are assumed to be\
physics-based models unless it is specified differently.\
Most modelling projects consist of a chain of models,\
(workflow). Here only the Physics Equations should be given\
and only names appearing in the content list of the Review of\
Materials Modelling VI should be entered. This review is\
available on\
http://ec.europa.eu/research/industrial_technologies/e-\
library.cfm).All models should be identified as electronic,\
atomistic, mesoscopic or continuum.",
        "items": {
          "title": {
            "ui:field": "autoFilledTitle"
          },
          "userCaseAspects": {
            "classNames": "user-case-aspects",
            "aspectsOfInterest": {
              "ui:widget": "textarea"
            },
            "material": {
              "ui:widget": "textarea"
            },
            "geometry": {
              "ui:widget": "textarea"
            },
            "timeLapse": {
              "ui:widget": "textarea"
            },
            "manufacturingProcessOrConditions": {
              "ui:widget": "textarea"
            },
            "publications": {
              "ui:widget": "textarea"
            }
          },
          "genericPhysics": {
            "classNames": "generic-physics",
            "romm_pe": {
              "classNames": "cuds_type",
              "ui:widget": "cudstreeselect"
            },
            "modelEntity": {
              
            },
            "modelPE": {
              "physicsEquations": {
                "items": {
                  "equation": {
                    "ui:widget": "mathjax",
                    "ui:help": `Equations written with the Equation Tool in Microsoft Word 2010 or later can be extracted as MathML. This is an accessible format that can be read aloud by assistive tools such as STEMReader. To do so you must first change a setting in the Equation Options.
To access the Equation Options, select the “Insert” tab and then the “Equation” button. Alternatively use the keyboard shortcut: Alt + =.
Select the small icon in the bottom right of the Tools panel to open the Equation Options. In Word 2016 you can also type Equation Options in the “Tell me what to do” help box above the ribbon tool this window directly.
More information: https://publicwiki-01.fraunhofer.de/Matics/index.php/EMMC_MODA_tool_and_curation_system`,
                  },
                  "description": {
                    "ui:widget": "textarea"
                  }
                }
              },
              "physicalQuantities": {
                "ui:help": `Please use the most common term in your domain for each quantity. (velocity, stress, tensore, etc.)`,
                "items": {
                  "symbol": {
                    "ui:widget": "mathjax"
                  },
                  "description": {
                    "ui:widget": "textarea"
                  }
                }
              }
            },
            "materialRelations": {
              "relations": {
                "ui:help": `Please use the most common term used in your field according to the RoMM and also specify to which equation it completes.`,
                "items": {
                  "symbol": {
                    "ui:widget": "mathjax"
                  },
                  "description": {
                    "ui:widget": "textarea"
                  }
                }
              },
              "descriptors": {
                "items": {
                  "symbol": {
                    "ui:widget": "mathjax"
                  },
                  "description": {
                    "ui:widget": "textarea"
                  }
                }
              }
            },
            "simulatedInput": {
              "ui:widget": "CustomEnum",
              "ui:help": `If the model responsible for the simulated input is not defined, please define it first then come back here.`
            }
          },
          "solverSpecs": {
            "classNames": "solver-specs",
            "softwareTool": {
              "website": {
                "ui:widget": "uri"
              }
            },
            "computationalRepresentation": {
              "physicsEquationCR": {
                "ui:widget": "textarea"
              },
              "materialRelationsCR": {
                "ui:widget": "textarea"
              },
              "materialCR": {
                "ui:widget": "textarea"
              },
            },
            "computationalBoundaryConditions": {
                "ui:widget": "textarea"
            },
            "additionalSolverParameters": {
              "ui:widget": "textarea"
            },
          },
          "postProcessing": {
            "classNames": "post-processing",
            "processedOutput": {
              "ui:widget": "textarea"
            },
            "methodologies": {
              "ui:widget": "textarea"
            },
            "errorMargin": {
              "ui:widget": "textarea"
            }
          }
        }
      },
      "databasedModels": {
        "classNames": "data-based-models",
        "ui:help": "If data-based models are used, please specify.",
        "items": {
          "dbUserCase": {
            "classNames": "user-case",
            "ui:widget": "textarea"
          },
          "theDatabasedModel": {
            "classNames": "the-databased-model",
            "ui:widget": "textarea"
          },
          "computationalDetails": {
            "classNames": "computational-details",
            "ui:widget": "textarea"
          }
        }
      }
    }
  }
};
