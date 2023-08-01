import { createElement, closest, formatUnit } from "@syncfusion/ej2-base";
import { DiagramComponent, SelectorConstraints, Overview, SymbolPaletteComponent, Keys, KeyModifiers, DiagramAction, DiagramTools, NodeConstraints, ConnectorConstraints, UndoRedo, DiagramContextMenu, Snapping, DataBinding, PrintAndExport, BpmnDiagrams, HierarchicalTree, MindMap as MindMapTree, ConnectorBridging, LayoutAnimation, SymbolPalette } from "@syncfusion/ej2-react-diagrams";
import { Diagram, SnapConstraints, ControlPointsVisibility, BezierSmoothness } from "@syncfusion/ej2-react-diagrams";
import { DropDownButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import { DiagramClientSideEvents, OrgChartPropertyBinding } from "./script/events";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { ToolbarComponent, ItemsDirective, ItemDirective, ContextMenuComponent, ContextMenuSettingsModel } from '@syncfusion/ej2-react-navigations';
import * as React from 'react';
import { NumericTextBoxComponent, ColorPickerComponent, SliderComponent } from "@syncfusion/ej2-react-inputs";
import { Uploader } from '@syncfusion/ej2-react-inputs';
import { RadioButtonComponent, ButtonComponent, CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { Palettes } from "./script/palettes";
import { DropDownDataSources } from './script/dropdowndatasource';
import { DiagramPropertyBinding } from './script/events';
import { SelectorViewModel } from "./script/selector";
import { UtilityMethods } from "./script/utilitymethods";
Diagram.Inject(UndoRedo, DiagramContextMenu, Snapping, DataBinding);
Diagram.Inject(PrintAndExport, BpmnDiagrams, HierarchicalTree, MindMapTree, ConnectorBridging, LayoutAnimation);
SymbolPalette.Inject(BpmnDiagrams);


export class PaperSize {
}
export let diagramName;
export let beforItem;
export let loadDiagram;
export let beforeOpen;
export let designContextMenuOpen;
export let editContextMenuOpen;
export let beforeClose;
export let menuclick;
export let tooledit;
export let zoomTemplate;
export let zoomchange;
export let connectorTool;
export let connectorToolChange;
export let propertyPanel;
export let footTemplate;
export let printTemplateChange;
export let offsetChange;
export let offsetYchnage;
export let nodeWidthChange;
export let nodeHeightChange;
export let aspectRatioValue;
export let rotationChange;
export let toolbarNodeInsert;
export let nodeFillColor;
export let gradientChange;
export let gradientDirectionChange;
export let gradientColorChange;
export let opacityChange;
export let lineTypeChange;
export let lineColorChange;
export let lineStyleChange;
export let lineWidthChange;
export let sourceTypeChange;
export let targetTypeChange;
export let sourceSizeChange;
export let targetSizeChange;
export let bridgeChange;
export let bridgeSizeChange;
export let connectorOpacityChange;
export let fontFamilyChange;
export let fontSizeChange;
export let fontColorChange;
export let strokeColorChange;
export let nodeBorderChange
export let strokeWidthChange
export let fontOpacityChange




class App extends React.Component {
  constructor(props) {
    super(props);
    this.animationSettings = { effect: 'None' };
    this.dropdownListFields = { text: 'text', value: 'value' };
    this.pageSettings = {
      background: { color: '#FFFFFF' }, width: 600, height: 1460, margin: { left: 5, top: 5 },
      orientation: 'Landscape', showPageBreaks: false,
    };
    this.nodes = [
      {
        id: 'Start1', offsetX: 100, offsetY: 300, width: 50, height: 50, shape: {
          type: 'Bpmn', shape: 'Event',
          event: { event: 'Start' }
        },
      },
      {
        id: 'Task1', width: 120, height: 75, offsetX: 250, offsetY: 300,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Receive' }
          },
        },
        annotations: [{ content: 'Receive Book lending Request' }]
      },
      {
        id: 'Task2', width: 120, height: 75, offsetX: 420, offsetY: 300,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Service' }
          },
        },
        annotations: [{ content: 'Get the Book Status', offset: { x: 0.5, y: 0.6 } }]
      },
      {
        id: 'Gateway1', width: 70, height: 60, offsetX: 570, offsetY: 300,
        shape: { type: 'Bpmn', shape: 'Gateway', },
      },
      {
        id: 'Task3', width: 120, height: 75, offsetX: 780, offsetY: 300,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Send' }
          },
        },
        annotations: [{ content: 'On loan Reply' }]
      },
      {
        id: 'Gateway2', width: 70, height: 60, offsetX: 920, offsetY: 300,
        shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'EventBased' } },
      },
      {
        id: 'Intermediate1', offsetX: 1050, offsetY: 300, width: 50, height: 50, shape: {
          type: 'Bpmn', shape: 'Event',
          event: { event: 'Intermediate', trigger: 'Message' },
        },
        annotations: [{ content: 'Decline Hold', offset: { x: 0.5, y: 1.0 }, verticalAlignment: 'Top' }]
      },
      {
        id: 'Task4', width: 120, height: 75, offsetX: 1200, offsetY: 300,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Receive' }
          },
        },
        annotations: [{ content: 'Cancel Request' }]
      },
      {
        id: 'End1', offsetX: 1400, offsetY: 300, width: 50, height: 50, shape: {
          type: 'Bpmn', shape: 'Event',
          event: { event: 'End', },
        },
      },
      {
        id: 'Intermediate2', offsetX: 1050, offsetY: 200, width: 50, height: 50, shape: {
          type: 'Bpmn', shape: 'Event',
          event: { event: 'Intermediate', trigger: 'Message' },
        },
        annotations: [{ content: 'Hold Book', offset: { x: 0.5, y: 1.0 }, verticalAlignment: 'Top' }]
      },
      {
        id: 'Intermediate3', offsetX: 1050, offsetY: 400, width: 50, height: 50, shape: {
          type: 'Bpmn', shape: 'Event',
          event: { event: 'Intermediate', trigger: 'Message' },
        },
        annotations: [{ content: 'One Week', offset: { x: 0.5, y: 1.0 }, verticalAlignment: 'Top' }]
      },
      {
        id: 'Intermediate4', offsetX: 900, offsetY: 60, width: 50, height: 50, shape: {
          type: 'Bpmn', shape: 'Event',
          event: { event: 'Intermediate', trigger: 'Message' },
        },
        annotations: [{ content: 'Two Weeks', offset: { x: 0.5, y: 1.0 }, verticalAlignment: 'Top' }]
      },
      {
        id: 'Task5', width: 120, height: 75, offsetX: 780, offsetY: 550,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'User' }
          },
        },
        annotations: [{ content: 'Checkout the Book' }]
      },
      {
        id: 'Task6', width: 120, height: 75, offsetX: 1050, offsetY: 550,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Receive' }
          },
        },
        annotations: [{ content: 'Checkout Reply' }]
      },
      {
        id: 'Task7', width: 120, height: 75, offsetX: 1200, offsetY: 200,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Service' }
          },
        },
        annotations: [{ content: 'Request Hold' }]
      },
      {
        id: 'Task8', width: 120, height: 75, offsetX: 1400, offsetY: 200,
        shape: {
          type: 'Bpmn', shape: 'Activity', activity: {
            activity: 'Task', task: { type: 'Receive' }
          },
        },
        annotations: [{ content: 'Hold Reply' }]
      },
    ];
    this.connectors =
      [
        {
          id: 'connector1', sourceID: 'Start1', targetID: 'Task1', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector2', sourceID: 'Task1', targetID: 'Task2', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector3', sourceID: 'Task2', targetID: 'Gateway1', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector4', sourceID: 'Gateway1', targetID: 'Task3', annotations: [{ content: 'Book is on Loan' }], type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector5', sourceID: 'Task3', targetID: 'Gateway2', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector6', sourceID: 'Gateway2', targetID: 'Intermediate1', sourcePortID: 'right', targetPortID: 'left', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector7', sourceID: 'Intermediate1', targetID: 'Task4', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector8', sourceID: 'Task4', targetID: 'End1', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector9', sourceID: 'Gateway2', targetID: 'Intermediate2', sourcePortID: 'top', targetPortID: 'left', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector10', sourceID: 'Gateway2', targetID: 'Intermediate3', sourcePortID: 'bottom', targetPortID: 'left', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector11', sourceID: 'Intermediate2', targetID: 'Task7', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector12', sourceID: 'Intermediate3', targetID: 'Task4', sourcePortID: 'right', targetPortID: 'bottom', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector13', sourceID: 'Task7', targetID: 'Task8', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector14', sourceID: 'Task8', targetID: 'Intermediate4', sourcePortID: 'top', targetPortID: 'right', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector15', sourceID: 'Intermediate4', targetID: 'Task2', sourcePortID: 'left', targetPortID: 'top', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector16', sourceID: 'Gateway1', targetID: 'Task5', sourcePortID: 'bottom', targetPortID: 'left',
          annotations: [{ content: 'Book is Avaliable' }], type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector17', sourceID: 'Task5', targetID: 'Task6', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
        {
          id: 'connector18', sourceID: 'Task6', targetID: 'End1', sourcePortID: 'right', targetPortID: 'bottom', type: 'Orthogonal', shape: { type: 'Bpmn', sequence: 'Normal' }
        },
      ];
    this.contextMenu = {
      show: true,
      items: [
        {
          text: 'Copy', id: 'Copy', target: '.e-diagramcontent', iconCss: 'sf-icon-copy'
        },
        {
          text: 'Cut', id: 'Cut', target: '.e-diagramcontent', iconCss: 'sf-icon-cut'
        },
        {
          text: 'Paste', id: 'Paste', target: '.e-diagramcontent', iconCss: 'sf-icon-paste'
        },
        {
          text: 'Delete', id: 'Delete', target: '.e-diagramcontent', iconCss: 'sf-icon-delete'
        },
        {
          text: 'Select All', id: 'SelectAll', target: '.e-diagramcontent', iconCss: 'e-menu-icon'
        },
        {
          text: 'Ad-Hoc', id: 'Adhoc',
          items: [{ text: 'None', iconCss: 'e-adhocs e-bpmn-event e-bpmn-icons e-None', id: 'AdhocNone' },
          { iconCss: 'e-adhocs e-bpmn-icons e-adhoc', text: 'Ad-Hoc', id: 'AdhocAdhoc' }]
        }, {
          text: 'Loop', id: 'Loop',
          items: [{ text: 'None', iconCss: 'e-loop e-bpmn-icons e-None', id: 'LoopNone' },
          { text: 'Standard', iconCss: 'e-loop e-bpmn-icons e-Loop', id: 'Standard' },
          { text: 'Parallel Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-ParallelMI', id: 'ParallelMultiInstance' },
          { text: 'Sequence Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-SequentialMI', id: 'SequenceMultiInstance' }]
        }, {
          text: 'Compensation', id: 'taskCompensation',
          items: [{ text: 'None', iconCss: 'e-compensation e-bpmn-icons e-None', id: 'CompensationNone' },
          { iconCss: 'e-compensation e-bpmn-icons e-Compensation', text: 'Compensation', id: 'CompensationCompensation' }]
        }, {
          text: 'Activity-Type', id: 'Activity-Type',
          items: [{ text: 'Collapsed sub-process', iconCss: 'e-bpmn-icons e-SubProcess', id: 'CollapsedSubProcess' },
          { iconCss: 'e-bpmn-icons e-Task', text: 'Expanded sub-process', id: 'ExpandedSubProcess' }]
        }, {
          text: 'Boundry', id: 'Boundry',
          items: [{ text: 'Default', iconCss: 'e-boundry e-bpmn-icons e-Default', id: 'Default' },
          { text: 'Call', iconCss: 'e-boundry e-bpmn-icons e-Call', id: 'BoundryCall' },
          { text: 'Event', iconCss: 'e-boundry e-bpmn-icons e-Event', id: 'BoundryEvent' }]
        }, {
          text: 'Data Object', id: 'DataObject',
          items: [{ text: 'None', iconCss: 'e-data e-bpmn-icons e-None', id: 'DataObjectNone' },
          { text: 'Input', iconCss: 'e-data e-bpmn-icons e-DataInput', id: 'Input' },
          { text: 'Output', iconCss: 'e-data e-bpmn-icons e-DataOutput', id: 'Output' }]
        }, {
          text: 'Collection', id: 'collection',
          items: [{ text: 'None', iconCss: 'e-collection e-bpmn-icons e-None', id: 'collectionNone' },
          { text: 'Collection', iconCss: 'e-collection e-bpmn-icons e-ParallelMI', id: 'Collectioncollection' }]
        }, {
          text: 'Call', id: 'DeftCall',
          items: [{ text: 'None', iconCss: 'e-call e-bpmn-icons e-None', id: 'CallNone' },
          { text: 'Call', iconCss: 'e-call e-bpmn-icons e-CallActivity', id: 'CallCall' }]
        }, {
          text: 'Trigger Result', id: 'TriggerResult',
          items: [{ text: 'None', id: 'TriggerNone', iconCss: 'e-trigger e-bpmn-icons e-None' },
          { text: 'Message', id: 'Message', iconCss: 'e-trigger e-bpmn-icons e-InMessage' },
          { text: 'Multiple', id: 'Multiple', iconCss: 'e-trigger e-bpmn-icons e-InMultiple' },
          { text: 'Parallel', id: 'Parallel', iconCss: 'e-trigger e-bpmn-icons e-InParallelMultiple' },
          { text: 'Signal', id: 'Signal', iconCss: 'e-trigger e-bpmn-icons e-InSignal' },
          { text: 'Timer', id: 'Timer', iconCss: 'e-trigger e-bpmn-icons e-InTimer' },
          { text: 'Cancel', id: 'Cancel', iconCss: 'e-trigger e-bpmn-icons e-CancelEnd' },
          { text: 'Escalation', id: 'Escalation', iconCss: 'e-trigger e-bpmn-icons e-InEscalation' },
          { text: 'Error', id: 'Error', iconCss: 'e-trigger e-bpmn-icons e-InError' },
          { text: 'Compensation', id: 'triggerCompensation', iconCss: 'e-trigger e-bpmn-icons e-InCompensation' },
          { text: 'Terminate', id: 'Terminate', iconCss: 'e-trigger e-bpmn-icons e-TerminateEnd' },
          { text: 'Conditional', id: 'Conditional', iconCss: 'e-trigger e-bpmn-icons e-InConditional' },
          { text: 'Link', id: 'Link', iconCss: 'e-trigger e-bpmn-icons e-ThrowLinkin' }
          ]
        },
        {
          text: 'Event Type', id: 'EventType',
          items: [{ text: 'Start', id: 'Start', iconCss: 'e-event e-bpmn-icons e-NoneStart', },
          { text: 'Intermediate', id: 'Intermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
          { text: 'NonInterruptingStart', id: 'NonInterruptingStart', iconCss: 'e-event e-bpmn-icons e-Noninterruptingstart' },
          { text: 'ThrowingIntermediate', id: 'ThrowingIntermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
          {
            text: 'NonInterruptingIntermediate', id: 'NonInterruptingIntermediate',
            iconCss: 'e-event e-bpmn-icons e-NoninterruptingIntermediate'
          },
          { text: 'End', id: 'End', iconCss: 'e-event e-bpmn-icons e-NoneEnd' }]
        }, {
          text: 'Task Type', id: 'TaskType',
          items: [
            { text: 'None', id: 'TaskNone', iconCss: 'e-task e-bpmn-icons e-None' },
            { text: 'Service', id: 'Service', iconCss: 'e-task e-bpmn-icons e-ServiceTask' },
            { text: 'BusinessRule', id: 'BusinessRule', iconCss: 'e-task e-bpmn-icons e-BusinessRule' },
            { text: 'InstantiatingReceive', id: 'InstantiatingReceive', iconCss: 'e-task e-bpmn-icons e-InstantiatingReceive' },
            { text: 'Manual', id: 'Manual', iconCss: 'e-task e-bpmn-icons e-ManualCall' },
            { text: 'Receive', id: 'Receive', iconCss: 'e-task e-bpmn-icons e-InMessage' },
            { text: 'Script', id: 'Script', iconCss: 'e-task e-bpmn-icons e-ScriptCall' },
            { text: 'Send', id: 'Send', iconCss: 'e-task e-bpmn-icons e-InMessage' },
            { text: 'User', id: 'User', iconCss: 'e-task e-bpmn-icons e-UserCall' },
          ]
        }, {
          text: 'GateWay', id: 'GateWay',
          iconCss: 'e-bpmn-icons e-Gateway', items: [
            { text: 'None', id: 'GatewayNone', iconCss: 'e-gate e-bpmn-icons e-None' },
            { text: 'Exclusive', iconCss: 'e-gate e-bpmn-icons e-ExclusiveGatewayWithMarker', id: 'Exclusive' },
            { text: 'Inclusive', iconCss: 'e-gate e-bpmn-icons e-InclusiveGateway', id: 'Inclusive' },
            { text: 'Parallel', iconCss: 'e-gate e-bpmn-icons e-ParallelGateway', id: 'GatewayParallel' },
            { text: 'Complex', iconCss: 'e-gate e-bpmn-icons e-ComplexGateway', id: 'Complex' },
            { text: 'EventBased', iconCss: 'e-gate e-bpmn-icons e-EventBasedGateway', id: 'EventBased' },
            { text: 'ExclusiveEventBased', iconCss: 'e-gate e-bpmn-icons e-ExclusiveEventBased', id: 'ExclusiveEventBased' },
            { text: 'ParallelEventBased', iconCss: 'e-gate e-bpmn-icons e-ParallelEventBasedGatewaytostart', id: 'ParallelEventBased' }
          ]
        },
        {
          text: 'Add Text Annotation', id: 'TextAnnotation', iconCss: 'e-bpmn-icons e-TextAnnotation'
        },
        {
          text: 'Association', id: 'Association', iconCss: 'e-bpmn-icons'
        },
        {
          text: 'Sequence', id: 'Sequence', iconCss: 'e-bpmn-icons'
        },
        {
          text: 'Message Flow', id: 'MessageFlow', iconCss: 'e-bpmn-icons'
        },
        {
          text: 'Condition type', id: 'Condition type', items: [
            { text: 'Default', id: 'None', iconCss: 'e-bpmn-icons' }, { text: 'Conditional', id: 'Conditional Flow', iconCss: 'e-bpmn-icons' },
            { text: 'Normal', id: 'Normal Flow', iconCss: 'e-bpmn-icons' },
          ]
        },
        {
          text: 'Direction', id: 'Direction', items: [
            { text: 'Default', id: 'None', iconCss: 'e-bpmn-icons' },
            { text: 'Directional', id: 'Directional', iconCss: 'e-bpmn-icons' },
            { text: 'Bi-Directional', id: 'BiDirectional', iconCss: 'e-bpmn-icons' },
          ]
        },
        {
          text: 'Message Type', id: 'MessageType', items: [
            { text: 'Default', id: 'None', iconCss: 'e-bpmn-icons' }, { text: 'Initiating Message', id: 'InitiatingMessage', iconCss: 'e-bpmn-icons' },
            { text: 'Non-Initiating Message', id: 'NonInitiatingMessage', iconCss: 'e-bpmn-icons' },
          ]
        },
      ],
      showCustomMenuOnly: true
    }
    this.scrollSettings = { canAutoScroll: true, scrollLimit: 'Infinity', minZoom: 0.25, maxZoom: 30 };
    this.rulerSettings = {
      showRulers: true, dynamicGrid: true, horizontalRuler: { interval: 10, segmentWidth: 100, thickness: 25, },
      verticalRuler: { interval: 10, segmentWidth: 100, thickness: 25 }
    }
    // this.selectedItems = { constraints: SelectorConstraints.All & ~SelectorConstraints.ResizeAll & ~SelectorConstraints.Rotate }
    this.selectedItem = new SelectorViewModel();
    this.dropDownDataSources = new DropDownDataSources();
    this.palettes = new Palettes();
    this.diagramEvents = new DiagramClientSideEvents(this.selectedItem, this.page);
    this.UtilityMethods = new UtilityMethods();
    this.diagramPropertyBinding = new DiagramPropertyBinding(this.selectedItem, this.page);
    this.diagramEvents.ddlTextPosition = this.ddlTextPosition;
    this.dlgTarget = document.body;
    this.dialogVisibility = false;
    this.isModalDialog = false;
    this.dialogAnimationSettings = { effect: 'None' };
    this.exportingButtons = this.getDialogButtons('export');
    this.printingButtons = this.getDialogButtons('print');

    loadDiagram = this.loadDiagram.bind(this);
    beforItem = this.beforeItemRender.bind(this);
    designContextMenuOpen = this.designContextMenuOpen.bind(this);
    editContextMenuOpen = this.editContextMenuOpen.bind(this);
    beforeOpen = this.arrangeMenuBeforeOpen.bind(this);
    beforeClose = this.arrangeMenuBeforeClose.bind(this);
    menuclick = this.menuClick.bind(this);
    tooledit = this.toolbarEditorClick.bind(this);
    propertyPanel = this.propertyPanel.bind(this)
    zoomTemplate = this.zoomTemplate.bind(this);
    zoomchange = this.zoomChange.bind(this);
    connectorTool = this.connectorTool.bind(this);
    connectorToolChange = this.connectorToolChange.bind(this);
    footTemplate = this.footerTemplate.bind(this);
    printTemplateChange = this.printTemplate.bind(this);
    diagramName = this.diagramNameChange.bind(this);

    offsetChange = this.offsetX.bind(this);
    offsetYchnage = this.offsetY.bind(this);
    nodeWidthChange = this.nodeWidth.bind(this);
    nodeHeightChange = this.nodeHeight.bind(this);
    aspectRatioValue = this.aspectRatioChange.bind(this);
    rotationChange = this.nodeRotationChange.bind(this);
    toolbarNodeInsert = this.toolbarInsertClick.bind(this);
    nodeFillColor = this.nodeFillColorChange.bind(this);
    gradientChange = this.nodeGradientChange.bind(this);
    gradientDirectionChange = this.gradientDropDownChange.bind(this);
    gradientColorChange = this.nodeGradientColorChange.bind(this);
    opacityChange = this.nodeOpacityChange.bind(this);
    lineTypeChange = this.connectorTypeChange.bind(this);
    lineColorChange = this.connectorColorChange.bind(this);
    lineStyleChange = this.ConnectorLineStyle.bind(this);
    lineWidthChange = this.ConnectorLineWidthChnage.bind(this);
    sourceTypeChange = this.connectorSourceType.bind(this);
    targetTypeChange = this.connectorTargetType.bind(this);
    sourceSizeChange = this.connectorSourceSize.bind(this);
    targetSizeChange = this.connectorTargetSize.bind(this);
    bridgeChange = this.connectorBridgeChange.bind(this);
    bridgeSizeChange = this.connectorBridgeSize.bind(this);
    connectorOpacityChange = this.ConnectorOpacityChange.bind(this);
    fontFamilyChange = this.nodeFontFamilyChange.bind(this);
    fontSizeChange = this.nodeFontSizeChange.bind(this);
    fontColorChange = this.nodeFontColor.bind(this);
    fontOpacityChange = this.fontOpacityChangeEvent.bind(this);

  }
  componentDidMount() {
    this.generateDiagram();
    this.uploader();
    document.onmouseover = this.menumouseover.bind(this);
  }
  render() {
    return (<div>
      <input type="file" id="fileupload" name="UploadFiles"></input>
      <ContextMenuComponent id='designContextMenu' ref={arrangeContextMenu => (this.arrangeContextMenu) = arrangeContextMenu} animationSettings={this.animationSettings} items={this.dropDownDataSources.designMenuItems} onOpen={designContextMenuOpen} cssClass="designMenu" beforeItemRender={beforItem} select={menuclick} beforeClose={() => this.arrangeMenuBeforeClose} />
      <ContextMenuComponent id='editContextMenu' ref={editContextMenu => (this.editContextMenu) = editContextMenu} animationSettings={this.animationSettings} onOpen={editContextMenuOpen} beforeItemRender={beforItem} select={menuclick} items={this.dropDownDataSources.editMenuItems} cssClass="editMenu" beforeClose={() => this.arrangeMenuBeforeClose} />
      <div className='diagrambuilder-container' >
        <div className='header navbar'>
          <div className="db-header-container">
            <div className="db-diagram-name-container">
              <span id='diagramName' className="db-diagram-name" style={{
                width: "250px", overflow: "hidden",
                textOverflow: "ellipse", whiteSpace: "nowrap",
              }} onClick={this.renameDiagram}>
                Untitled Diagram
              </span>
              <input id='diagramEditable' type="text" className="db-diagram-name" onFocus={this.diagramNameKeyDown} />
              <span id='diagramreport' className="db-diagram-name db-save-text" />
            </div>
            <div className='db-menu-container'>
              <div className="db-menu-style">
                <DropDownButtonComponent id="btnFileMenu" cssClass={"db-dropdown-menu"} content="File" items={this.dropDownDataSources.fileMenuItems} select={menuclick}
                  beforeItemRender={beforItem} beforeOpen={beforeOpen} beforeClose={beforeClose} />
              </div>
              <div className="db-menu-style">
                < DropDownButtonComponent id="btnEditMenu" cssClass={"db-dropdown-menu"} content="Edit"
                  items={this.dropDownDataSources.editMenuItems} select={menuclick} target='.e-contextmenu-wrapper.editMenu'
                  beforeItemRender={beforItem} beforeOpen={beforeOpen} beforeClose={beforeClose} />
              </div>
              <div className="db-menu-style">
                <DropDownButtonComponent id="btnDesignMenu" cssClass={"db-dropdown-menu"} content="Design" target='.e-contextmenu-wrapper.designMenu' items={this.dropDownDataSources.designMenuItems} select={menuclick}
                  beforeItemRender={beforItem} beforeOpen={beforeOpen} beforeClose={beforeClose} />
              </div>
              <div className="db-menu-style">
                <DropDownButtonComponent id="btnSelectMenu" cssClass={"db-dropdown-menu"} content="Select" items={this.dropDownDataSources.selectMenuItems} select={menuclick}
                  beforeItemRender={beforItem} beforeOpen={beforeOpen} beforeClose={beforeClose} />
              </div>
              <div className="db-menu-style">
                <DropDownButtonComponent id="btnToolsMenu" cssClass={"db-dropdown-menu"} content="Tools" items={this.dropDownDataSources.toolsMenuItems} select={menuclick}
                  beforeItemRender={beforItem} beforeOpen={beforeOpen} beforeClose={beforeClose} />
              </div>
              <div className="db-menu-style">
                <DropDownButtonComponent id="btnViewMenu" cssClass={"db-dropdown-menu"} content="View" items={this.dropDownDataSources.viewMenuItems} select={menuclick}
                  beforeItemRender={beforItem} beforeOpen={beforeOpen} beforeClose={beforeClose} />

              </div>
            </div>
          </div>
          <div className='db-toolbar-editor' >
            <div className='db-toolbar-container'>
              <ToolbarComponent ref={toolbar => (this.toolbarEditor) = toolbar} id='toolbarEditor' overflowMode='Scrollable' clicked={tooledit}>
                <ItemsDirective>

                  <ItemDirective prefixIcon='sf-icon-undo tb-icons' tooltipText='Undo' cssClass='tb-item-start tb-item-undo' />
                  <ItemDirective prefixIcon="sf-icon-redo tb-icons" tooltipText="Redo" cssClass="tb-item-end tb-item-redo" />
                  <ItemDirective type="Separator" />
                  <ItemDirective prefixIcon='sf-icon-pan' tooltipText='Pan Tool' cssClass='tb-item-start' />
                  <ItemDirective prefixIcon='sf-icon-pointer' tooltipText='Select Tool' cssClass='tb-item-middle tb-item-selected' />
                  <ItemDirective prefixIcon='sf-icon-straight_line' tooltipText='Connector Tool' template={connectorTool} cssClass="tb-item-middle tb-dropdown-btn" />
                  <ItemDirective prefixIcon='sf-icon-text tb-icons' tooltipText='Text Tool' cssClass='tb-item-end' />
                  <ItemDirective type="Separator" />
                  <ItemDirective prefixIcon='sf-icon-group tb-icons' tooltipText='Group' cssClass='tb-item-start' />
                  <ItemDirective prefixIcon="sf-icon-ungroup tb-icons" tooltipText="UnGroup" cssClass="tb-item-end" />
                  <ItemDirective type="Separator" />
                  <ItemDirective prefixIcon='sf-icon-align_left' tooltipText='AlignLeft' cssClass='tb-item-start' />
                  <ItemDirective prefixIcon='sf-icon-align_center' tooltipText='AlignCenter' cssClass='tb-item-middle' />
                  <ItemDirective prefixIcon='sf-icon-align_right' tooltipText='AlignRight' cssClass='tb-item-middle' />
                  <ItemDirective prefixIcon='sf-icon-align_top' tooltipText='AlignTop' cssClass='tb-item-middle' />
                  <ItemDirective prefixIcon='sf-icon-align_middle' tooltipText='AlignMiddle' cssClass='tb-item-middle' />
                  <ItemDirective prefixIcon='sf-icon-align_bottom' tooltipText='AlignBottom' cssClass='tb-item-end' />
                  <ItemDirective prefixIcon='sf-icon-distribute_vertical' tooltipText='Distribute Vertically' cssClass='tb-item-middle' />
                  <ItemDirective prefixIcon='sf-icon-distribute_horizontal' tooltipText='Distribute Horizontally' cssClass='tb-item-middle' />
                  <ItemDirective type="Separator" />
                  <ItemDirective prefixIcon='sf-icon-send-to-back' tooltipText='Send To Back' cssClass='tb-item-start' />
                  <ItemDirective prefixIcon='sf-icon-bring-to-front' tooltipText='Bring To Front' cssClass='tb-item-middle' />
                  <ItemDirective prefixIcon='sf-icon-send-backward' tooltipText='Send Backward' cssClass='tb-item-middle' />
                  <ItemDirective prefixIcon='sf-icon-bring-forward' tooltipText='Bring Forward' cssClass='tb-item-end' />
                  <ItemDirective type="Separator" />
                  <ItemDirective prefixIcon='sf-icon-lock' tooltipText='Lock' cssClass='tb-item-start' />
                  <ItemDirective prefixIcon='sf-icon-delete' tooltipText='Delete' cssClass='tb-item-end' />
                  <ItemDirective type="Separator" />
                  <ItemDirective cssClass="tb-item-end tb-zoom-dropdown-btn" template={zoomTemplate} align='Right' />

                </ItemsDirective>
              </ToolbarComponent>
            </div>
            <div className="db-toolbar-hide-btn">
              <ButtonComponent id="hideProperty" iconCss='sf-icon-properties tb-icons' onClick={propertyPanel} />
            </div>
          </div>
        </div>
        <div className='row content'>
          <div className='sidebar show-overview'>
            <div className="db-palette-parent">
              <SymbolPaletteComponent ref={symbolpalette => (this.symbolpalette) = symbolpalette} id="symbolpalette" width="100%" height="100%"
                expandMode={this.palettes.expandMode}
                palettes={this.palettes.palettes}
                getNodeDefaults={this.palettes.setPaletteNodeDefaults}
                getConnectorDefaults={this.palettes.setPaletteConnectorDefaults}
                symbolPreview={this.palettes.symbolPreview} symbolMargin={this.palettes.symbolMargin}
                getSymbolInfo={this.palettes.getSymbolInfo} 
                />
            </div>
          </div>
          <div className='main-content' role='main'>
            <div className="db-diagram-container">
              <div id="diagramContainerDiv" className='db-current-diagram-container'>
                <DiagramComponent ref={diagram => (this.diagram = diagram)} id="diagram" width={"100%"} height={"100%"}
                  scrollSettings={this.scrollSettings} selectedItems={this.selectedItems} rulerSettings={this.rulerSettings}
                  pageSettings={this.pageSettings} nodes={this.nodes} connectors={this.connectors} backgroundColor="transparent"
                  selectionChange={this.diagramEvents.selectionChange.bind(this.diagramEvents)}
                  historyChange={this.diagramEvents.historyChange.bind(this.diagramEvents)} created={this.created.bind(this)}
                  scrollChange={this.scrollChange.bind(this)} getConnectorDefaults={this.getConnectorDefaults.bind(this)} contextMenuSettings={this.contextMenu}
                  contextMenuClick={this.diagramEvents.contextMenuClick.bind(this)} contextMenuOpen={this.diagramEvents.contextMenuOpen.bind(this)} dragEnter={this.diagramEvents.dragEnter.bind(this)}
                />
              </div>

            </div>
            <div className='db-property-editor-container' style={{ overflow: "auto" }}>
              <div id="generalDiagramContainer" className="db-general-diagram-prop-container">
                <div id='diagramPropertyContainer' className="db-diagram-prop-container">
                  <div className="row db-prop-header-text">
                    Page Settings
                    <ButtonComponent id="hide-properties" className="close" iconCss="sf-icon-close" />
                  </div>
                  <div className="row db-prop-row">
                  <div className="row db-prop-header-text"  style={{paddingTop:'10px'}}></div>
                    <DropDownListComponent ref={dropdown => this.ddlTextPosition = dropdown} dataSource={this.dropDownDataSources.paperList} change={this.diagramPropertyBinding.paperListChange.bind(this.diagramPropertyBinding)} fields={this.dropdownListFields} value={this.selectedItem.pageSettings.paperSize} />
                  </div>
                  <div className="row db-prop-row" id="pageOrientation"  style={{paddingTop:'10px'}}>
                  <div className="row db-prop-header-text" style={{paddingTop:'10px'}}>Orientation</div>
                    <div className="col-xs-6 db-prop-col-style" style={{ marginLeft: "10px", width: "30%", paddingTop:'10px'}}>
                      <ButtonComponent id="pagePortrait"  isPrimary='true' isToggle="true" name='pageSettings' style={{fontSize:'12px'}} className="close"  iconCss="sf-icon-portrait" cssClass="e-flat e-primary" onChange={this.diagramPropertyBinding.pageOrientationChange.bind(this.diagramPropertyBinding)} content="Portrait"/>
                    </div>
                    <div className="col-xs-6 db-prop-col-style" style={{paddingTop:'10px'}}>
                      <ButtonComponent id="pageLandscape"  isPrimary='true' isToggle="true" name="pageSettings" className="close" style={{fontSize:'12px'}} iconCss="sf-icon-landscape" cssClass="e-flat e-primary e-active" onChange={this.diagramPropertyBinding.pageOrientationChange.bind(this.diagramPropertyBinding)} content="Landscape"/>
                    </div>
                  </div>
                  <div className="row db-prop-row" id="backgroundcolor"  style={{paddingTop:'10px'}}>
                  <div className="row db-prop-header-text">Background</div>
                    <div className="col-xs-6 db-col-left">
                      <div className="db-color-container" style={{paddingTop:'10px'}}>
                        <div className="db-color-input">
                          <ColorPickerComponent ref={colorPicker => this.colorPicker = colorPicker} mode="Palette" value={this.selectedItem.pageSettings.backgroundColor} change={this.diagramPropertyBinding.pageBackgroundChange1.bind(this.diagramPropertyBinding)} />
                        </div>
                        <div className="db-color-btn">
                          <ButtonComponent iconCss='sf-icon-Pickers tb-icons' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <CheckBoxComponent id='showPageBreaks' label="Page Breaks" checked={this.selectedItem.pageSettings.pageBreaks} change={this.diagramPropertyBinding.pageBreaksChange.bind(this.diagramPropertyBinding)} />
                  </div>
                </div>
                <div id='nodePropertyContainer' className="db-node-prop-container" style={{ display: "none" }}>
                  <div className="db-node-behaviour-prop">
                    <div className="row db-prop-header-text">
                      Properties
                      <ButtonComponent id="hide-properties" className="close" iconCss='sf-icon-close tb-icons' />
                    </div>
                    <div className="row db-prop-header-text">
                      Dimensions
                    </div>
                    <div className="row db-prop-row">
                      <div className="col-xs-6 db-col-left">
                        <div className="db-text-container">
                          <div className="db-text">
                            <span>X</span>
                          </div>
                          <div className="db-text-input">
                            <NumericTextBoxComponent ref={nodeOffsetX => (this.nodeOffsetX = nodeOffsetX)} id="nodeOffsetX" format="n0"
                              // value={this.selectedItem.nodeProperties.offsetX} 
                              change={offsetChange} />
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-6 db-col-right">
                        <div className="db-text-container">
                          <div className="db-text">
                            <span>Y</span>
                          </div>
                          <div className="db-text-input">
                            <NumericTextBoxComponent ref={nodeOffsetY => (this.nodeOffsetY = nodeOffsetY)} id="nodeOffsetY" format="n0"
                              // value={this.selectedItem.nodeProperties.offsetY} 
                              change={offsetYchnage} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row db-prop-row">
                      <div className="col-xs-6 db-col-left">
                        <div className="db-text-container">
                          <div className="db-text">
                            <span>W</span>
                          </div>
                          <div className="db-text-input">
                            <NumericTextBoxComponent ref={width => (this.width = width)} id="nodeWidth" min={1} format="n0"
                              // value={this.selectedItem.nodeProperties.width}
                              change={nodeWidthChange} />
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-6 db-col-right">
                        <div className="db-text-container">
                          <div className="db-text">
                            <span>H</span>
                          </div>
                          <div className="db-text-input">
                            <NumericTextBoxComponent ref={height => (this.height = height)} id="nodeHeight" min={1} format="n0"
                              // value={this.selectedItem.nodeProperties.height} 
                              change={nodeHeightChange} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row db-prop-row">
                      <div className="col-xs-6 db-col-left">
                        <CheckBoxComponent ref={aspectRatio => (this.aspectRatio = aspectRatio)} id='aspectRatio' label="Aspect Ratio" checked={this.selectedItem.nodeProperties.aspectRatio} change={aspectRatioValue} />
                      </div>
                    </div>
                    <div className="row db-prop-row">
                      <div className="col-xs-6 db-col-left">
                        <span className="db-prop-text-style">Rotate</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-6 db-col-left">
                        <div className="db-text-container">
                          <div className="db-text">
                            <ButtonComponent iconCss='sf-icon-Rotate1 tb-icons' />
                          </div>
                          <div className="db-text-input">
                            <NumericTextBoxComponent ref={rotate => (this.rotate = rotate)} id="nodeRotateAngle" format="n0"
                              // value={this.selectedItem.nodeProperties.rotateAngle}
                              change={rotationChange} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="db-prop-separator" />
                    <div className="row db-prop-header-text">
                      Insert</div>
                    <div className="row db-prop-row">
                      <div className="col-xs-6 db-col-left">
                        <ToolbarComponent ref={nodeInsert => (this.nodeInsert = nodeInsert)} id='toolbarNodeInsert' overflowMode='Scrollable' clicked={toolbarNodeInsert}>
                          <ItemsDirective>
                            <ItemDirective prefixIcon="sf-icon-InsertLink tb-icons" tooltipText="Insert Link" cssClass="tb-item-start" />
                            {/* <ItemDirective prefixIcon="sf-icon-InsertImage tb-icons" tooltipText="Insert Image" cssClass="tb-item-end" /> */}
                          </ItemsDirective>
                        </ToolbarComponent>
                      </div>
                    </div>
                    <div className="db-prop-separator" />
                  </div>
                  <div id='nodeStyleProperties' className="db-node-style-prop">
                    <div className="row db-background-style">
                      <div className="row db-prop-header-text">
                        Background and Border Styles
                      </div>
                      <div className="row db-prop-row">
                        <div className="col-xs-6 db-col-left">
                          <div className="db-color-container">
                            <div className="db-color-input">
                              <ColorPickerComponent ref={fillColor => (this.fillColor = fillColor)} type="color" mode="Palette" value={this.selectedItem.nodeProperties.fillColor} change={nodeFillColor} id="nodeFillColor" />
                            </div>
                            <div className="db-color-btn">
                              <ButtonComponent iconCss='sf-icon-ColorPickers tb-icons' />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id='gradientStyle' className="row db-prop-row db-gradient-style-hide">
                        <div className="col-xs-4 db-col-left">
                          <CheckBoxComponent ref={gradient => (this.gradient = gradient)} id='gradient' label="Gradient" checked={this.selectedItem.nodeProperties.gradient} change={gradientChange} />
                        </div>
                        <div className="col-xs-4 db-col-center">
                          <DropDownListComponent ref={gradientDirection => this.gradientDirection = gradientDirection} value={this.selectedItem.nodeProperties.gradientDirection} dataSource={this.dropDownDataSources.gradientDirections} fields={this.dropdownListFields} popupHeight={"200px"} change={gradientDirectionChange} />
                        </div>
                        <div className="col-xs-4 db-col-right">
                          <div className="db-color-container">
                            <div className="db-color-input">
                              <ColorPickerComponent type="color" mode="Palette" ref={gradientColor => this.gradientColor = gradientColor} value={this.selectedItem.nodeProperties.gradientColor} change={gradientColorChange} />
                            </div>
                            <div className="db-color-btn">
                              <ButtonComponent iconCss='sf-icon-ColorPickers tb-icons' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row db-border-style">
                      <div className="row db-prop-header-text db-border-style-header">
                        Border/Line Styles
                      </div>
                      <div className="row db-prop-row">
                        <div className="col-xs-4 db-col-right">
                          <span className="db-prop-text-style">Stroke Color</span>
                        </div>
                        <div className="col-xs-4 db-col-center">
                          <span className="db-prop-text-style">Stroke Style</span>
                        </div>
                        <div className="col-xs-4 db-col-left">
                          <span className="db-prop-text-style">Stroke Width</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-4 db-col-left">
                          <div className="db-color-container">
                            <div className="db-color-input">
                              <ColorPickerComponent id="nodeStrokeColor" ref={strokeColor => this.strokeColor = strokeColor} type="color" mode="Palette" value={this.selectedItem.nodeProperties.strokeColor} change={strokeColorChange} />
                            </div>
                            <div className="db-color-btn">
                              <ButtonComponent iconCss='sf-icon-Pickers tb-icons' />
                            </div>
                          </div>
                        </div>

                        <div className="col-xs-4 db-col-center">
                          <DropDownListComponent ref={nodeBorder => this.nodeBorder = nodeBorder} id="nodeBorderStyle" value={this.selectedItem.nodeProperties.strokeStyle} dataSource={this.dropDownDataSources.borderStyles} popupWidth={"160px"} fields={this.dropdownListFields} change={nodeBorderChange} itemTemplate={this.nodeBorderItemTemplate} valueTemplate={this.nodeBorderValueTemplate} />
                        </div>
                        <div className="col-xs-4 db-col-right">
                          <NumericTextBoxComponent ref={strokeWidth => this.strokeWidth = strokeWidth} id="nodeStrokeWidth" min={0} step={0.5} value={this.selectedItem.nodeProperties.strokeWidth} change={strokeWidthChange} />
                        </div>
                      </div>
                      <div className="row db-prop-row">
                        <div className="col-xs-2 db-col-right db-prop-text-style" style={{ paddingTop: "6px" }}>
                          <span className="db-prop-text-style">Opacity</span>
                        </div>
                        <div className="col-xs-8 db-col-left" style={{ paddingRight: "10px" }}>
                          <SliderComponent ref={opacity => this.opacity = opacity} value={this.selectedItem.nodeProperties.opacity} min={0} max={100} step={10} type='MinRange' change={opacityChange} />
                        </div>
                        <div className="col-xs-2 db-col-right">
                          <input id='nodeOpacitySliderText' type="text" value={this.selectedItem.nodeProperties.opacityText} readOnly={true} className="db-readonly-input" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id='connectorPropertyContainer' className="db-connector-prop-container" style={{ display: "none" }}>
                  <div className="row db-prop-header-text">
                    Connector Properties
                    <ButtonComponent id="hide-properties" className="close" iconCss='sf-icon-close tb-icons' />
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-6 db-col-left db-prop-text-style">
                      <span className="db-prop-text-style">Connector Type</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6 db-col-left">
                      <DropDownListComponent ref={lineType => this.lineType = lineType} value={this.selectedItem.connectorProperties.lineType} dataSource={this.dropDownDataSources.lineTypes} fields={this.dropdownListFields} change={lineTypeChange} />
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-6 db-col-left">
                      <div className="db-color-container">
                        <div className="db-color-input">
                          <ColorPickerComponent ref={lineColor => this.lineColor = lineColor} mode="Palette" type="color" id="lineColor" value={this.selectedItem.connectorProperties.lineColor} change={lineColorChange} />
                        </div>
                        <div className="db-color-btn">
                          <ButtonComponent iconCss='sf-icon-Pickers tb-icons' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-8 db-col-left db-prop-text-style">
                      <span className="db-prop-text-style">Stroke Style</span>
                    </div>
                    <div className="col-xs-4 db-col-right db-prop-text-style">
                      <span className="db-prop-text-style">Thickness</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-8 db-col-left">
                      <DropDownListComponent ref={lineStyle => this.lineStyle = lineStyle} id="lineStyle" value={this.selectedItem.connectorProperties.lineStyle} dataSource={this.dropDownDataSources.borderStyles} fields={this.dropdownListFields} itemTemplate={this.lineItemTemplate} valueTemplate={this.lineValueTemplate} change={lineStyleChange} />
                    </div>
                    <div className="col-xs-4 db-col-right">
                      <NumericTextBoxComponent min={0.5} step={0.5} ref={lineWidth => this.lineWidth = lineWidth} value={this.selectedItem.connectorProperties.lineWidth} change={lineWidthChange} />
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-8 db-col-left db-prop-text-style">
                      <span className="db-prop-text-style">Start Arrow</span>
                    </div>
                    <div className="col-xs-4 db-col-right db-prop-text-style">
                      <span className="db-prop-text-style">Size</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-8 db-col-left">
                      <DropDownListComponent ref={sourceType => this.sourceType = sourceType} value={this.selectedItem.connectorProperties.sourceType} dataSource={this.dropDownDataSources.decoratorList} fields={this.dropdownListFields} change={sourceTypeChange} />
                    </div>
                    <div className="col-xs-4 db-col-right">
                      <NumericTextBoxComponent ref={sourceSize => this.sourceSize = sourceSize} min={1} step={1} value={this.selectedItem.connectorProperties.sourceSize} change={sourceSizeChange} />
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-8 db-col-left db-prop-text-style">
                      <span className="db-prop-text-style">End Arrow</span>
                    </div>
                    <div className="col-xs-4 db-col-right db-prop-text-style">
                      <span className="db-prop-text-style">Size</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-8 db-col-left">
                      <DropDownListComponent ref={targetType => this.targetType = targetType} value={this.selectedItem.connectorProperties.targetType} dataSource={this.dropDownDataSources.decoratorList} fields={this.dropdownListFields} change={targetTypeChange} />
                    </div>
                    <div className="col-xs-4 db-col-right">
                      <NumericTextBoxComponent ref={targetSize => this.targetSize = targetSize} min={1} step={1} value={this.selectedItem.connectorProperties.targetSize} change={targetSizeChange} />
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-8 db-col-left" style={{ marginTop: "5px" }}>
                      <CheckBoxComponent ref={bridge => this.bridge = bridge} id='lineJump' label="Bridging" checked={this.selectedItem.connectorProperties.lineJump} change={bridgeChange} />
                    </div>
                    <div className="col-xs-4 db-col-right" id="lineJumpSizeDiv" style={{ display: "none" }}>
                      <NumericTextBoxComponent ref={bridgeSize => this.bridgeSize = bridgeSize} min={1} step={1} value={this.selectedItem.connectorProperties.lineJumpSize} change={bridgeSizeChange} />
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-2 db-col-right db-prop-text-style" style={{ paddingTop: "6px" }}>
                      <span className="db-prop-text-style">Opacity</span>
                    </div>
                    <div className="col-xs-8 db-col-left" style={{ paddingRight: "10px" }}>
                      <SliderComponent id='default' ref={connectorOpacity => this.connectorOpacity = connectorOpacity} value={this.selectedItem.connectorProperties.opacity} min={0} max={100} step={10} type='MinRange' change={connectorOpacityChange} />
                    </div>
                    <div className="col-xs-2 db-col-right">
                      <input id='connectorOpacitySliderText' type="text" readOnly={true} className="db-readonly-input" />
                    </div>
                  </div>
                </div>
                <div id='textPropertyContainer' className="db-text-prop-container" style={{ display: "none" }}>
                  <div className="db-prop-separator" />
                  <div className="row db-prop-header-text">
                    Text
                    <ButtonComponent id="hide-properties" iconCss='sf-icon-close tb-icons' />
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-8 db-col-left">
                      <DropDownListComponent ref={fontFamily => this.fontFamily = fontFamily} dataSource={this.dropDownDataSources.fontFamilyList} fields={this.dropdownListFields} change={fontFamilyChange} />
                    </div>
                    <div className="col-xs-4 db-col-right">
                      <NumericTextBoxComponent min={1} ref={fontSize => this.fontSize = fontSize} step={1} value={this.selectedItem.textProperties.fontSize} change={fontSizeChange} />
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-6 db-col-left" id="textPositionDiv">
                      <DropDownListComponent ref={dropdown => this.ddlTextPosition = dropdown} dataSource={this.selectedItem.textProperties.textPositionDataSource} index={4} fields={this.dropdownListFields} change={this.diagramPropertyBinding.textPositionChange.bind(this.diagramPropertyBinding)} />
                    </div>
                    <div className="col-xs-6 db-col-right" id="textColorDiv">
                      <div className="db-color-container">
                        <div className="db-color-input">
                          <ColorPickerComponent ref={fontColor => this.fontColor = fontColor} mode="Palette" type="color" value={this.selectedItem.textProperties.fontColor} change={fontColorChange} />
                        </div>
                        <div className="db-color-btn">
                          <ButtonComponent iconCss='sf-icon-ColorPickers tb-icons' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-6 db-col-left">
                      <ToolbarComponent id='toolbarTextStyle' overflowMode='Scrollable' clicked={this.diagramPropertyBinding.toolbarTextStyleChange.bind(this.diagramPropertyBinding)}>
                        <ItemsDirective>
                          <ItemDirective prefixIcon="sf-icon-Bold tb-icons" tooltipText="Bold" cssClass="tb-item-start" />
                          <ItemDirective prefixIcon="sf-icon-Italic tb-icons" tooltipText="Italic" cssClass="tb-item-middle" />
                          <ItemDirective prefixIcon="sf-icon-Underline tb-icons" tooltipText="Underline" cssClass="tb-item-end" />
                        </ItemsDirective>
                      </ToolbarComponent>
                    </div>
                    <div className="col-xs-6 db-col-right">
                      <ToolbarComponent id='toolbarTextSubAlignment' overflowMode='Scrollable' clicked={this.diagramPropertyBinding.toolbarTextSubAlignChange.bind(this.diagramPropertyBinding)}>
                        <ItemsDirective>
                          <ItemDirective prefixIcon="sf-icon-ParaAlignLeft tb-icons" tooltipText="Align Text Left" cssClass="tb-item-start" />
                          <ItemDirective prefixIcon="sf-icon-ParaAlignCenter tb-icons" tooltipText="Align Text Center" cssClass="tb-item-middle" />
                          <ItemDirective prefixIcon="sf-icon-ParaAlignRight tb-icons" tooltipText="Align Text Right" cssClass="tb-item-end" />
                        </ItemsDirective>
                      </ToolbarComponent>
                    </div>
                  </div>
                  <div className="row db-prop-row" id='toolbarTextAlignmentDiv'>
                    <ToolbarComponent id='toolbarTextAlignment' ref={toolbarTextAlignment => toolbarTextAlignment = toolbarTextAlignment} overflowMode='Scrollable' clicked={this.diagramPropertyBinding.toolbarTextAlignChange.bind(this.diagramPropertyBinding)}>
                      <ItemsDirective>
                        <ItemDirective prefixIcon="sf-icon-TextLeft tb-icons" tooltipText="Align Right" cssClass="tb-item-start" />
                        <ItemDirective prefixIcon="sf-icon-TextVerticalCenter tb-icons" tooltipText="Align Center" cssClass="tb-item-middle" />
                        <ItemDirective prefixIcon="sf-icon-TextRight tb-icons" tooltipText="Align Left" cssClass="tb-item-middle" />
                        <ItemDirective prefixIcon="sf-icon-TextTop tb-icons" tooltipText="Align Bottom" cssClass="tb-item-middle" />
                        <ItemDirective prefixIcon="sf-icon-TextHorizontalCenter tb-icons" tooltipText="Align Middle" cssClass="tb-item-middle" />
                        <ItemDirective prefixIcon="sf-icon-TextBottom tb-icons" tooltipText="Align Top" cssClass="tb-item-end" />
                      </ItemsDirective>
                    </ToolbarComponent>
                  </div>
                  <div className="row db-prop-row">
                    <div className="col-xs-2 db-col-right db-prop-text-style" style={{ paddingTop: "6px" }}>
                      <span className="db-prop-text-style">Opacity</span>
                    </div>
                    <div className="col-xs-8 db-col-left" style={{ paddingRight: "10px" }}>
                      <SliderComponent ref={fontOpacity => this.fontOpacity = fontOpacity} value={this.selectedItem.textProperties.opacity} min={0} max={100} step={10} type='MinRange' change={fontOpacityChange} />
                    </div>
                    <div className="col-xs-2 db-col-right">
                      <input id='textOpacityText' type="text" value={this.selectedItem.textProperties.opacityText} readOnly={true} className="db-readonly-input" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogComponent ref={dialog => this.exportDialog = dialog} id="exportDialog" width={"400px"} header='Export Diagram' target={this.dlgTarget} isModal={true} animationSettings={this.dialogAnimationSettings} buttons={this.exportingButtons} showCloseIcon={true} content={footTemplate} visible={this.dialogVisibility} />
      <DialogComponent id="printDialog" ref={dialog => this.printDialog = dialog} width={"335px"} header='Print Diagram' target={this.dlgTarget} isModal={true} animationSettings={this.dialogAnimationSettings} buttons={this.printingButtons} content={printTemplateChange} visible={this.dialogVisibility} />

    </div>);
  }
  renameDiagram() {
    document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
    const element = document.getElementById('diagramEditable');
    element.value = document.getElementById('diagramName').innerHTML;
    element.focus();
    element.select();
  }
  diagramNameKeyDown(args) {
    if (args.which === 13) {
      document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
      document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    }
  }
  diagramNameChange() {
    document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
    document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
    this.selectedItem.exportSettings.fileName = document.getElementById('diagramName').innerHTML;
  }
  generateDiagram() {
    this.selectedItem.selectedDiagram = this.diagram;
  }
  uploader() {
    let uploadObj = new Uploader({
      asyncSettings: {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
      },
      success: this.onUploadSuccess,
      showFileList: false
    });
    uploadObj.appendTo('#fileupload');
  }

  onUploadSuccess(args) {
    var file1 = args.file;
    var file = file1.rawFile;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = loadDiagram;
  }

  //Load the diagraming object.
  loadDiagram(event) {
    let diagrm = document.getElementById('diagram').ej2_instances[0];
    diagrm.loadDiagram(event.target.result);
  }
  beforeItemRender(args) {
    const shortCutText = this.getShortCutKey(args.item.text);
    if (shortCutText) {
      const shortCutSpan = createElement('span');
      shortCutSpan.textContent = shortCutText;
      shortCutSpan.style.pointerEvents = 'none';
      args.element.appendChild(shortCutSpan);
      shortCutSpan.setAttribute('class', 'db-shortcut');
    }
    const status = this.UtilityMethods.enableMenuItems(args.item.text, this.selectedItem);
    if (status) {
      args.element.classList.add('e-disabled');
    }
    else {
      if (args.element.classList.contains('e-disabled')) {
        args.element.classList.remove('e-disabled');
      }
    }
  }
  designContextMenuOpen(args) {
    if (args.element.classList.contains('e-menu-parent')) {
      const popup = document.querySelector('#btnDesignMenu-popup');
      args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
      args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
    }
  }
  editContextMenuOpen(args) {
    if (args.element.classList.contains('e-menu-parent')) {
      var popup = document.querySelector('#btnEditMenu-popup');
      args.element.style.left = formatUnit(parseInt(args.element.style.left, 10) - parseInt(popup.style.left, 10));
      args.element.style.top = formatUnit(parseInt(args.element.style.top, 10) - parseInt(popup.style.top, 10));
    }
  }

  footerTemplate() {
    return (<div id="exportDialogContent">
      <div className="row">
        <div className="row">
          File Name
        </div>
        <div className="row db-dialog-child-prop-row">
          <input type="text" id="exportfileName" value={this.selectedItem.exportSettings.fileName} />
        </div>
      </div>
      <div className="row db-dialog-prop-row">
        <div className="col-xs-6 db-col-left">
          <div className="row">
            Format
          </div>
          <div className="row db-dialog-child-prop-row">
            <DropDownListComponent id="exportFormat" ref={dropdown => this.ddlTextPosition = dropdown} value={this.selectedItem.exportSettings.format} dataSource={this.dropDownDataSources.fileFormats} fields={this.dropdownListFields} />

          </div>
        </div>
        <div className="col-xs-6 db-col-right">
          <div className="row">
            Region
          </div>
          <div className="row db-dialog-child-prop-row">
            <DropDownListComponent ref={dropdown => this.ddlTextPosition = dropdown} id="exportRegion" value={this.selectedItem.exportSettings.region} dataSource={this.dropDownDataSources.diagramRegions} fields={this.dropdownListFields} />
          </div>
        </div>
      </div>
    </div>);
  }
  printTemplate() {
    return (<div id="printDialogContent">
      <div className="row">
        <div className="row">
          Region
        </div>
        <div className="row db-dialog-child-prop-row">
          <DropDownListComponent ref={dropdown => this.ddlTextPosition = dropdown} value={this.selectedItem.printSettings.region} dataSource={this.dropDownDataSources.diagramRegions} fields={this.dropdownListFields} />
        </div>
      </div>
      <div className="row db-dialog-prop-row">
        <div className="row">
          Print Settings
        </div>
        <div className="row db-dialog-child-prop-row">
          <DropDownListComponent ref={dropdown => this.ddlTextPosition = dropdown} dataSource={this.dropDownDataSources.paperList} fields={this.dropdownListFields} value={this.selectedItem.pageSettings.paperSize} />
        </div>
      </div>
      <div id="printCustomSize" className="row db-dialog-prop-row" style={{ display: "none", height: "28px" }}>
        <div className="col-xs-6 db-col-left">
          <div className="db-text-container">
            <div className="db-text">
              <span>W</span>
            </div>
            <div className="db-text-input">
              <NumericTextBoxComponent id="printPageWidth" min={100} step={1} format="n0" value={this.selectedItem.printSettings.pageWidth} />
            </div>
          </div>
        </div>
        <div className="col-xs-6 db-col-right">
          <div className="db-text-container">
            <div className="db-text">
              <span>H</span>
            </div>
            <div className="db-text-input">
              <NumericTextBoxComponent id="printPageHeight" min={100} step={1} format="n0" value={this.selectedItem.printSettings.pageHeight} />
            </div>
          </div>
        </div>
      </div>
      <div id="printOrientation" className="row db-dialog-prop-row" style={{ height: "28px", padding: "5px 0px" }}>
        <div className="col-xs-3 db-prop-col-style" style={{ marginRight: "8px" }}>
          <RadioButtonComponent id='printPortrait' label="Portrait" name="printSettings" checked={this.selectedItem.printSettings.isPortrait} />
        </div>
        <div className="col-xs-3 db-prop-col-style">
          <RadioButtonComponent id='printLandscape' label="Landscape" name="printSettings" checked={this.selectedItem.printSettings.isLandscape} />
        </div>
      </div>
      <div className="row db-dialog-prop-row" style={{ marginTop: "16px" }}>
        <CheckBoxComponent id='printMultiplePage' label="Scale to fit 1 page" checked={this.selectedItem.printSettings.multiplePage} />
      </div>
    </div>);
  }
  getDialogButtons(dialogType) {
    const buttons = [];
    // eslint-disable-next-line
    switch (dialogType) {
      case 'export':
        buttons.push({
          click: this.btnExportClick.bind(this), buttonModel: { content: 'Export', cssClass: 'e-flat e-db-primary', isPrimary: true }
        });
        break;
      case 'print':
        buttons.push({
          click: this.btnPrintClick.bind(this), buttonModel: { content: 'Print', cssClass: 'e-flat e-db-primary', isPrimary: true }
        });
        break;
    }
    buttons.push({
      click: this.btnCancelClick.bind(this), buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
    });
    return buttons;
  }
  btnExportClick() {
    var diagram = this.selectedItem.selectedDiagram;
    var region = document.getElementById("exportRegion").ej2_instances[0];
    var format = document.getElementById("exportFormat").ej2_instances[0];
    // var fileName = document.getElementById("exportfileName").ej2_instances[0];
    diagram.exportDiagram({
      fileName: this.selectedItem.exportSettings.fileName,
      format: format.value,
      region: region.value,
      multiplePage: diagram.pageSettings.multiplePage
    });
    this.exportDialog.hide();
  }
  btnPrintClick() {
    let pageWidth = this.selectedItem.printSettings.pageWidth;
    let pageHeight = this.selectedItem.printSettings.pageHeight;
    const paperSize = this.getPaperSize(this.selectedItem.printSettings.paperSize);
    if (paperSize.pageHeight && paperSize.pageWidth) {
      pageWidth = paperSize.pageWidth;
      pageHeight = paperSize.pageHeight;
    }
    if (this.selectedItem.pageSettings.isPortrait) {
      if (pageWidth > pageHeight) {
        const temp = pageWidth;
        pageWidth = pageHeight;
        pageHeight = temp;
      }
    }
    else {
      if (pageHeight > pageWidth) {
        const temp = pageHeight;
        pageHeight = pageWidth;
        pageWidth = temp;
      }
    }
    const diagram = this.selectedItem.selectedDiagram;
    diagram.print({
      "region": this.selectedItem.printSettings.region,
      "pageHeight": pageHeight, "pageWidth": pageWidth,
      "multiplePage": !this.selectedItem.printSettings.multiplePage,
      "pageOrientation": this.selectedItem.printSettings.isPortrait ? 'Portrait' : 'Landscape'
    });
    this.printDialog.hide();
  }
  btnCancelClick(args) {
    const ss = args.target;
    const key = ss.offsetParent.id;
    // eslint-disable-next-line
    switch (key) {
      case 'exportDialog':
        this.exportDialog.hide();
        break;
      case 'printDialog':
        this.printDialog.hide();
        break;

    }
  }
  toolbarEditorClick(args) {
    var diagram = this.selectedItem.selectedDiagram;
    var item = args.item.tooltipText;
    switch (item) {
      case 'Undo':
        diagram.undo();
        break;
      case 'Redo':
        diagram.redo();
        break;
      case 'Select Tool':
        diagram.clearSelection();
        diagram.tool = DiagramTools.Default;
        break;
      case 'Pan Tool':
        diagram.clearSelection()
        diagram.tool = DiagramTools.ZoomPan;
        break;
      case 'Text Tool':
        diagram.clearSelection()
        diagram.selectedItems.userHandles = [];
        diagram.drawingObject = { shape: { type: 'Text' }, };
        diagram.tool = DiagramTools.ContinuousDraw;
        break;
      case 'Group':
        diagram.group();
        break;
      case 'UnGroup':
        diagram.unGroup();
        break;
      case 'AlignLeft':
        diagram.align('Left');
        break;
      case 'AlignRight':
        diagram.align('Right');
        break;
      case 'AlignCenter':
        diagram.align('Center');
        break;
      case 'AlignMiddle':
        diagram.align('Middle');
        break;
      case 'AlignTop':
        diagram.align('Top');
        break;
      case 'AlignBottom':
        diagram.align('Bottom');
        break;
      case 'Distribute Vertically':
        diagram.distribute('BottomToTop');
        break;
      case 'Distribute Horizontally':
        diagram.distribute('RightToLeft');
        break;
      case 'Send To Back':
        diagram.sendToBack();
        break;
      case 'Bring To Front':
        diagram.bringToFront();
        break;
      case 'Send Backward':
        diagram.sendBackward();
        break;
      case 'Bring Forward':
        diagram.moveForward();
        break;
      case 'Lock':
        this.lockObject(diagram);
        break;
      case 'Delete':
        diagram.remove();
        break;
    }
    if (item === 'Select Tool' || item === 'Pan Tool' || item === 'Connector Tool') {
      if (args.item.cssClass.indexOf('tb-item-selected') === -1) {
        this.removeSelectedToolbarItem();
        args.item.cssClass += ' tb-item-selected';
      }
    }
    diagram.dataBind();
  };
  removeSelectedToolbarItem() {
    var toolbarObj = document.getElementById("toolbarEditor").ej2_instances[0];
    for (var i = 0; i < toolbarObj.items.length; i++) {
      var item = toolbarObj.items[i];
      if (item.cssClass.indexOf('tb-item-selected') !== -1) {
        item.cssClass = item.cssClass.replace(' tb-item-selected', '');
      }
    }
    toolbarObj.dataBind();
    //document.getElementById('conTypeBtn').classList.remove('tb-item-selected');
  };
  zoomTemplate() {
    return (<div id="template_toolbar">
      <DropDownButtonComponent id="btnZoomIncrement" items={this.dropDownDataSources.zoomMenuItems} content={this.selectedItem.scrollSettings.currentZoom} select={zoomchange} />
    </div>);
  }

  connectorTool() {
    return (<div id="connector_toolbar">
      <DropDownButtonComponent id="connectorTool" items={this.dropDownDataSources.drawConnectorsList} select={connectorToolChange} />
    </div>);
  }
  propertyPanel() {
    this.selectedItem.utilityMethods.hideElements('hide-properties',this.selectedItem.selectedDiagram)
  }

  connectorToolChange(args) {
    var diagram = this.selectedItem.selectedDiagram;
    diagram.clearSelection();
    diagram.drawingObject = { type: args.item.text }
    diagram.tool = DiagramTools.ContinuousDraw;
    diagram.selectedItems.userHandles = [];
    diagram.dataBind();
    args.item.cssClass += ' tb-item-selected';
  }
  zoomChange(args) {
    var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
    var diagram = this.selectedItem.selectedDiagram;
    var currentZoom = diagram.scrollSettings.currentZoom;
    var zoom = {};
    switch (args.item.text) {
      case 'Zoom In':
        diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
        zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
        break;
      case 'Zoom Out':
        diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
        zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
        break;
      case 'Zoom to Fit':
        diagram.fitToPage({ mode: 'Page', region: 'Content' });
        zoomCurrentValue.content = diagram.scrollSettings.currentZoom;
        break;
      case 'Zoom to 50%':
        if (currentZoom === 0.5) {
          currentZoom = 0;
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        } else {
          zoom.zoomFactor = (0.5 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        break;
      case 'Zoom to 100%':
        if (currentZoom === 1) {
          currentZoom = 0;
          zoom.zoomFactor = (1 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        } else {
          zoom.zoomFactor = (1 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        break;
      case 'Zoom to 200%':
        if (currentZoom === 2) {
          currentZoom = 0;
          zoom.zoomFactor = (2 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        else {
          zoom.zoomFactor = (2 / currentZoom) - 1;
          diagram.zoomTo(zoom);
        }
        break;
    }

    zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom * 100) + ' %';

  }
  getShortCutKey(menuItem) {
    let shortCutKey = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
    // eslint-disable-next-line
    switch (menuItem) {
      case 'New':
        // eslint-disable-next-line
        shortCutKey = 'Shift' + '+N';
        break;
      case 'Open':
        shortCutKey = shortCutKey + '+O';
        break;
      case 'Save':
        shortCutKey = shortCutKey + '+S';
        break;
      case 'Undo':
        shortCutKey = shortCutKey + '+Z';
        break;
      case 'Redo':
        shortCutKey = shortCutKey + '+Y';
        break;
      case 'Cut':
        shortCutKey = shortCutKey + '+X';
        break;
      case 'Copy':
        shortCutKey = shortCutKey + '+C';
        break;
      case 'Paste':
        shortCutKey = shortCutKey + '+V';
        break;
      case 'Delete':
        shortCutKey = 'Delete';
        break;
      case 'Duplicate':
        shortCutKey = shortCutKey + '+D';
        break;
      case 'Select All':
        shortCutKey = shortCutKey + '+A';
        break;
      case 'Zoom In':
        shortCutKey = shortCutKey + '++';
        break;
      case 'Zoom Out':
        shortCutKey = shortCutKey + '+-';
        break;
      case 'Group':
        shortCutKey = shortCutKey + '+G';
        break;
      case 'Ungroup':
        shortCutKey = shortCutKey + '+U';
        break;
      case 'Send To Back':
        shortCutKey = shortCutKey + '+Shift+B';
        break;
      case 'Bring To Front':
        shortCutKey = shortCutKey + '+Shift+F';
        break;
      default:
        shortCutKey = '';
        break;
    }
    return shortCutKey;
  }
  created() {
    var diagram = this.selectedItem.selectedDiagram;
    diagram.fitToPage({ mode: 'Width' });
  }
  scrollChange(args) {
    var diagram = this.selectedItem.selectedDiagram;
    if (args.panState !== 'Start') {
      var btnZoomIncrement = document.getElementById("btnZoomIncrement").ej2_instances[0];
      btnZoomIncrement.content = Math.round(diagram.scrollSettings.currentZoom * 100) + ' %';
    }
  }

  getConnectorDefaults(connector) {
    // connector.type = 'Orthogonal';
    connector.hitPadding = 10;
    connector.bezierSettings = {
      controlPointsVisibility: ControlPointsVisibility.Source | ControlPointsVisibility.Target
      , smoothness: BezierSmoothness.SymmetricDistance
    }
  };
  arrangeMenuBeforeOpen(args) {
    for (var i = 0; i < args.element.children.length; i++) {
      args.element.children[i].style.display = 'block';
    }

    if (args.event && closest(args.event.target, '.e-dropdown-btn') !== null) {
      args.cancel = true;
    }
  }
  arrangeMenuBeforeClose(args) {
    if (args.event && closest(args.event.target, '.e-dropdown-btn') !== null) {
      args.cancel = true;
    }
    if (!args.element) {
      args.cancel = true;
    }
  }

  menuClick(args) {
    const buttonElement = document.getElementsByClassName('e-btn-hover')[0];
    if (buttonElement) {
      buttonElement.classList.remove('e-btn-hover');
    }
    const diagram = this.selectedItem.selectedDiagram;
    const commandType = args.item.text;
    switch (commandType) {
      case 'New':
        diagram.clear();
        DiagramClientSideEvents.prototype.historyChange();
        break;
      case 'Open':
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        break;
      case 'Save':
        this.selectedItem.exportSettings.fileName = document.getElementById('diagramName').innerHTML.value;
        this.download(diagram.saveDiagram());
        break;
      case 'Print':
        this.selectedItem.printSettings.pageHeight = this.selectedItem.pageSettings.pageHeight;
        this.selectedItem.printSettings.pageWidth = this.selectedItem.pageSettings.pageWidth;
        this.selectedItem.printSettings.paperSize = this.selectedItem.pageSettings.paperSize;
        this.selectedItem.printSettings.isPortrait = this.selectedItem.pageSettings.isPortrait;
        this.selectedItem.printSettings.isLandscape = !this.selectedItem.pageSettings.isPortrait;
        this.printDialog.show();
        break;
      case 'Export':
        this.exportDialog.show();
        break;
      case 'Open':
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        break;
      case 'Undo':
        diagram.undo();
        break;
      case 'Redo':
        diagram.redo();
        break;
      case 'Cut':
        diagram.cut();
        break;
      case 'Copy':
        diagram.copy();
        break;
      case 'Paste':
        diagram.paste();
        break;
      case 'Rotate Right 90':
        diagram.rotate(diagram.selectedItems, 90);
        break;
      case 'Rotate Left 90':
        diagram.rotate(diagram.selectedItems, -90);
        break;
      case 'Delete':
        diagram.remove();
        break;
      case 'Select All':
        diagram.clearSelection();
        diagram.selectAll();
        break;
      case 'Select All Nodes':
        diagram.clearSelection();
        diagram.select(diagram.nodes);
        break;
      case 'Select All Connectors':
        diagram.clearSelection();
        diagram.select(diagram.connectors);
        break;
      case 'Deselect All':
        diagram.clearSelection();
        break;
      case 'Selection Tool':
        diagram.tool = DiagramTools.Default;
        this.removeSelectedToolbarItem();
        break;
      case 'Pan Tool':
        diagram.clearSelection();
        diagram.tool = DiagramTools.ZoomPan;
        this.removeSelectedToolbarItem();
        break;
      case 'Show Lines':
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.ShowLines;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'Snap To Grid':
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.SnapToLines;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'Snap To Object':
        diagram.snapSettings.constraints = diagram.snapSettings.constraints ^ SnapConstraints.SnapToObject;
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        break;
      case 'Show Ruler':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        diagram.rulerSettings.showRulers = !diagram.rulerSettings.showRulers;
        break;
      case 'Show Page Breaks':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        diagram.pageSettings.showPageBreaks = !diagram.pageSettings.showPageBreaks;
        //showPageBreaks.checked = !showPageBreaks.checked;
        break;
      case 'Show Multiple page':
        args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
        diagram.pageSettings.multiplePage = !diagram.pageSettings.multiplePage;
        break;
      case 'Fit To Width':
        diagram.fitToPage({ mode: 'Width' });
        break;
      case 'Fit To Page':
        diagram.fitToPage({ mode: 'Page', region: 'Content' });
        break;
      case 'Landscape':
        args.item.parentObj.items[1].iconCss = '';
        args.item.iconCss = 'sf-icon-check-tick';
        diagram.pageSettings.orientation = 'Landscape';
        break;
      case 'Portrait':
        args.item.parentObj.items[0].iconCss = '';
        args.item.iconCss = 'sf-icon-check-tick';
        diagram.pageSettings.orientation = 'Portrait';
        break;
      case 'Letter (8.5 in x 11 in)':
      case 'Legal (8.5 in x 14 in)':
      case 'A3 (297 mm x 420 mm)':
      case 'A4 (210 mm x 297 mm)':
      case 'A5 (148 mm x 210 mm)':
      case 'A6 (105 mm x 148 mm)':
      case 'Tabloid (279 mm x 432 mm)':
        this.paperListChange(args, diagram)
        this.selectedItem.pageSettings.paperSize = args.item.value;
        this.updateSelection(args.item);
        break;
    }
    diagram.dataBind();
  }
  paperListChange(args, diagram) {
    var value = args.item.value;
    var paperSize = this.getPaperSize(value);
    var pageWidth = paperSize.pageWidth;
    var pageHeight = paperSize.pageHeight;
    if (pageWidth && pageHeight) {
      if (diagram.pageSettings.orientation === 'Portrait') {
        if (pageWidth > pageHeight) {
          var temp = pageWidth;
          pageWidth = pageHeight;
          pageHeight = temp;
        }
      }
      else {
        if (pageHeight > pageWidth) {
          var temp = pageHeight;
          pageHeight = pageWidth;
          pageWidth = temp;
        }
      }
      diagram.pageSettings.width = pageWidth;
      diagram.pageSettings.height = pageHeight;
    }
    else {
      diagram.pageSettings.width = 1460;
      diagram.pageSettings.height = 600;
    }
    let designContextMenu = document.getElementById('designContextMenu').ej2_instances[0];
    this.updatePaperSelection(designContextMenu.items[1], args.item.value);
    diagram.dataBind();
  };
  updatePaperSelection(items, value) {
    for (var i = 0; i < items.items.length; i++) {
      if (value === items.items[i].value) {
        items.items[i].iconCss = 'sf-icon-check-tick';
      }
      else {
        items.items[i].iconCss = '';
      }
    }
  };

  updateSelection(item) {
    for (var i = 0; i < item.parentObj.items.length; i++) {
      if (item.text === item.parentObj.items[i].text) {
        item.parentObj.items[i].iconCss = 'sf-icon-check-tick';
      }
      else {
        item.parentObj.items[i].iconCss = '';
      }
    }
  };
  getPaperSize(args) {
    var paperSize = new PaperSize();
    switch (args) {
      case 'Letter':
        paperSize.pageWidth = 816;
        paperSize.pageHeight = 1056;
        break;
      case 'Legal':
        paperSize.pageWidth = 816;
        paperSize.pageHeight = 1344;
        break;
      case 'Tabloid':
        paperSize.pageWidth = 1056;
        paperSize.pageHeight = 1632;
        break;
      case 'A0':
        paperSize.pageWidth = 3179;
        paperSize.pageHeight = 4494;
        break;
      case 'A1':
        paperSize.pageWidth = 2245;
        paperSize.pageHeight = 3179;
        break;
      case 'A2':
        paperSize.pageWidth = 1587;
        paperSize.pageHeight = 2245;
        break;
      case 'A3':
        paperSize.pageWidth = 1122;
        paperSize.pageHeight = 1587;
        break;
      case 'A4':
        paperSize.pageWidth = 793;
        paperSize.pageHeight = 1122;
        break;
      case 'A5':
        paperSize.pageWidth = 559;
        paperSize.pageHeight = 793;
        break;
      case 'A6':
        paperSize.pageWidth = 396;
        paperSize.pageHeight = 559;
        break;
    }
    return paperSize
  };
  download(data) {
    if (window.navigator.msSaveBlob) {
      var blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
      window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json');
    }
    else {
      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
      var a = document.createElement('a');
      a.href = dataStr;
      a.download = document.getElementById('diagramName').innerHTML + '.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };
  menumouseover(args) {
    var target = args.target;
    var diagram = this.selectedItem.selectedDiagram;
    if (target && (target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu' ||
      target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active')) {
      if (this.buttonInstance && this.buttonInstance.id !== target.id) {
        if (this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
          this.buttonInstance.toggle();
          const buttonElement = document.getElementById(this.buttonInstance.element.id);
          buttonElement.classList.remove('e-btn-hover');
        }
      }
      var button1 = target.ej2_instances[0];
      this.buttonInstance = button1;
      if (button1.getPopUpElement().classList.contains('e-popup-close')) {
        button1.toggle();
        if (button1.element.id === 'btnEditMenu') {
          this.enableEditMenuItems(diagram);
        }
        const buttonElement = document.getElementById(this.buttonInstance.element.id);
        buttonElement.classList.add('e-btn-hover');
      }
    }
    else {
      if (closest(target, '.e-dropdown-popup') === null && closest(target, '.e-dropdown-btn') === null) {
        if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
          this.buttonInstance.toggle();
          const buttonElement = document.getElementById(this.buttonInstance.element.id);
          buttonElement.classList.remove('e-btn-hover');
        }
      }
    }
  }
  enableEditMenuItems(diagram) {
    var contextInstance = document.getElementById('editContextMenu');
    var contextMenu = contextInstance.ej2_instances[0];
    var selectedItems = diagram.selectedItems.nodes;
    selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
    for (var i = 0; i < contextMenu.items.length; i++) {
      contextMenu.enableItems([contextMenu.items[i].text], false);
    }
    var objects = diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors);
    if (objects.length > 0) {
      contextMenu.enableItems(['Cut', 'Copy', 'Delete', 'Order Commands', 'Rotate']);
    }
    if (diagram.historyManager.undoStack.length > 0) {
      contextMenu.enableItems(['Undo']);
    }
    if (diagram.historyManager.redoStack.length > 0) {
      contextMenu.enableItems(['Redo']);
    }
    if ((diagram.commandHandler.clipboardData.pasteIndex !== undefined
      && diagram.commandHandler.clipboardData.clipObject !== undefined)) {
      contextMenu.enableItems(['Paste']);
    }
  }
  lockObject(diagram) {
    for (let i = 0; i < (diagram).selectedItems.nodes.length; i++) {
      let node = diagram.selectedItems.nodes[i];
      if (node.constraints & NodeConstraints.Drag) {
        node.constraints = NodeConstraints.PointerEvents | NodeConstraints.Select;
      } else {
        node.constraints = NodeConstraints.Default;
      }
    }
    for (let i = 0; i < diagram.selectedItems.connectors.length; i++) {
      let connector = diagram.selectedItems.connectors[i];
      if (connector.constraints & ConnectorConstraints.Drag) {
        connector.constraints = ConnectorConstraints.PointerEvents | ConnectorConstraints.Select;
      } else {
        connector.constraints = ConnectorConstraints.Default;
      }
    }
    diagram.dataBind();
  }

  offsetX(args) {
    if (args.isInteracted) {
      this.selectedItem.nodeProperties.offsetX.value = args.value;
      this.selectedItem.nodePropertyChange({ propertyName: 'offsetX', propertyValue: args });
    }
  }
  offsetY(args) {
    if (args.isInteracted) {
      this.selectedItem.nodeProperties.offsetY.value = args.value;
      this.selectedItem.nodePropertyChange({ propertyName: 'offsetY', propertyValue: args });
    }
  }
  nodeWidth(args) {
    if (args.isInteracted) {
      this.selectedItem.nodeProperties.width.value = args.value;
      this.selectedItem.nodePropertyChange({ propertyName: 'width', propertyValue: args });
    }
  }
  nodeHeight(args) {
    if (args.isInteracted) {
      this.selectedItem.nodeProperties.height.value = args.value;
      this.selectedItem.nodePropertyChange({ propertyName: 'height', propertyValue: args });
    }
  }
  aspectRatioChange(args) {
    this.selectedItem.nodePropertyChange({ propertyName: 'aspectRatio', propertyValue: args });
  }
  nodeRotationChange(args) {
    this.selectedItem.nodeProperties.rotateAngle.value = args.value;
    this.selectedItem.nodePropertyChange({ propertyName: 'rotateAngle', propertyValue: args });
  }
  nodeFillColorChange(args) {
    this.selectedItem.nodePropertyChange({ propertyName: 'fillColor', propertyValue: args.currentValue.hex });
  }
  nodeGradientChange(args) {
    this.selectedItem.nodeProperties.gradient = args.value;
    const gradientElement = document.getElementById('gradientStyle');
    if (args.checked) {
      gradientElement.className = 'row db-prop-row db-gradient-style-show';
    }
    else {
      gradientElement.className = 'row db-prop-row db-gradient-style-hide';
    }
    this.selectedItem.nodePropertyChange({ propertyName: 'gradient', propertyValue: args });
  }
  gradientDropDownChange(args) {
    this.selectedItem.nodePropertyChange({ propertyName: 'gradientDirection', propertyValue: args });
  }
  nodeGradientColorChange(args) {
    this.selectedItem.nodeProperties.gradientColor.value = args.currentValue.hex;
    this.selectedItem.nodePropertyChange({ propertyName: 'gradientColor', propertyValue: args });
  }
  nodeOpacityChange(args) {
    this.selectedItem.nodeProperties.opacity.value = args.value;
    this.selectedItem.nodePropertyChange({ propertyName: 'opacity', propertyValue: args });
  }
  connectorTypeChange(args) {
    this.selectedItem.connectorProperties.lineType.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'lineType', propertyValue: args });
  }
  connectorColorChange(args) {
    this.selectedItem.connectorProperties.lineColor.value = args.currentValue.hex;
    this.selectedItem.connectorPropertyChange({ propertyName: 'lineColor', propertyValue: args });
  }
  ConnectorLineStyle(args) {
    this.selectedItem.connectorProperties.lineStyle.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'lineStyle', propertyValue: args });
  }
  ConnectorLineWidthChnage(args) {
    this.selectedItem.connectorProperties.lineWidth.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'lineWidth', propertyValue: args });
  }
  connectorSourceType(args) {
    this.selectedItem.connectorProperties.sourceType.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'sourceType', propertyValue: args });
  }
  connectorTargetType(args) {
    this.selectedItem.connectorProperties.targetType.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'targetType', propertyValue: args });
  }
  connectorSourceSize(args) {
    this.selectedItem.connectorProperties.sourceSize.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'sourceSize', propertyValue: args });
  }
  connectorTargetSize(args) {
    this.selectedItem.connectorProperties.targetSize.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'targetSize', propertyValue: args });
  }
  connectorBridgeChange(args) {
    if (args.checked) {
      document.getElementById('lineJumpSizeDiv').style.display = '';
    }
    else {
      document.getElementById('lineJumpSizeDiv').style.display = 'none';
    }
    this.selectedItem.connectorPropertyChange({ propertyName: 'lineJump', propertyValue: args });
  }
  connectorBridgeSize(args) {
    this.selectedItem.connectorProperties.lineJumpSize.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'lineJumpSize', propertyValue: args });
  }
  ConnectorOpacityChange(args) {
    this.selectedItem.connectorProperties.opacity.value = args.value;
    this.selectedItem.connectorPropertyChange({ propertyName: 'opacity', propertyValue: args });
  }
  nodeFontFamilyChange(args) {
    this.selectedItem.textProperties.fontFamily.value = args.value;
    this.selectedItem.textPropertyChange({ propertyName: 'fontFamily', propertyValue: args });
  }
  nodeFontSizeChange(args) {
    this.selectedItem.textProperties.fontSize.value = args.value;
    this.selectedItem.textPropertyChange({ propertyName: 'fontSize', propertyValue: args });
  }
  nodeFontColor(args) {
    this.selectedItem.textProperties.fontColor.value = args.currentValue.hex;
    this.selectedItem.textPropertyChange({ propertyName: 'fontColor', propertyValue: args });
  }
  fontOpacityChangeEvent(args) {
    this.selectedItem.textProperties.opacity.value = args.value;
    this.selectedItem.textPropertyChange({ propertyName: 'opacity', propertyValue: args });
  }
  toolbarInsertClick(args) {
    const diagram = this.selectedItem.selectedDiagram;
    const commandType = args.item.tooltipText.replace(/[' ']/g, '');
    if (diagram.selectedItems.nodes.length > 0) {
      // eslint-disable-next-line
      switch (commandType.toLowerCase()) {
        case 'insertlink':
          document.getElementById('hyperlink').value = '';
          document.getElementById('hyperlinkText').value = '';
          if (diagram.selectedItems.nodes[0].annotations.length > 0) {
            const annotation = diagram.selectedItems.nodes[0].annotations[0];
            if (annotation.hyperlink.link || annotation.content) {
              document.getElementById('hyperlink').value = annotation.hyperlink.link;
              document.getElementById('hyperlinkText').value = (annotation.hyperlink.content || annotation.content);
            }
          }
          this.hyperlinkDialog.show();
          break;
        // case 'insertimage':
        //   CommonKeyboardCommands.openUploadBox(false, '.jpg,.png,.bmp');
        //   break;
      }
    }
  }

}

export default App;
