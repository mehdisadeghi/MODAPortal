import React from 'react'


function AddButton({ onClick, disabled }) {
  return (
    <div className="row">
      <p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
        <IconBtn
          type="info"
          icon="plus"
          className="btn-add col-xs-12"
          tabIndex="0"
          onClick={onClick}
          disabled={disabled}
        />
      </p>
    </div>
  );
}

function IconBtn(props) {
  const { type = "default", icon, className, ...otherProps } = props;
  return (
    <button
      type="button"
      className={`btn btn-${type} ${className}`}
      {...otherProps}
    >
      <i className={`glyphicon glyphicon-${icon}`} />
    </button>
  );
}

function ArrayFieldTitle({ TitleField, idSchema, title, required }) {
  if (!title) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  const id = `${idSchema.$id}__title`;
  return <TitleField id={id} title={title} required={required} />;
}

// Used in the two templates
function DefaultArrayItem(props) {
  const btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold",
  }
  const rand = Math.floor(Math.random() * (100 - 1)) + 1
  const collapseId = 'ArrayItem_' + rand
  return (
    <div key={props.index} className={props.className}>
      {props.hasToolbar &&
        <div className="array-item-toolbox" style={{margin: '0 auto',width: '25%',marginRight: '0', paddingRight: '10px'}}>
          <div
            className="btn-group"
            style={{ display: "flex", justifyContent: "space-around" }}
          >

          <IconBtn
            icon="resize-vertical"
            className="array-item-move-up"
            tabIndex="-1"
            style={btnStyle}
            disabled={false}
            data-toggle="collapse"
            data-target={"#" + collapseId}
          />

          {(props.hasMoveUp || props.hasMoveDown) &&
            <IconBtn
              icon="arrow-up"
              className="array-item-move-up"
              tabIndex="-1"
              style={btnStyle}
              disabled={props.disabled || props.readonly || !props.hasMoveUp}
              onClick={props.onReorderClick(props.index, props.index - 1)}
            />}

          {(props.hasMoveUp || props.hasMoveDown) &&
            <IconBtn
              icon="arrow-down"
              className="array-item-move-down"
              tabIndex="-1"
              style={btnStyle}
              disabled={
                props.disabled || props.readonly || !props.hasMoveDown
              }
              onClick={props.onReorderClick(props.index, props.index + 1)}
            />}

          {props.hasRemove &&
            <IconBtn
              type="danger"
              icon="remove"
              className="array-item-remove"
              tabIndex="-1"
              style={btnStyle}
              disabled={props.disabled || props.readonly}
              onClick={props.onDropIndexClick(props.index)}
            />}

          </div>
        </div>}

    <div id={collapseId} className='collapse in'>
      <div style={{paddingLeft: '10px', paddingRight: '10px'}}>
        {props.children}
      </div>
    </div>
  </div>
  );
}

const ArrayFieldTemplate = (props) => {
  if (props.title === "Physics-based Models") {
    var i = 0;
    var inputs = [""];
    for(i=0; i<props.items.length; i++) {
      let title = "Model " + (i + 1);
      props.items[i].children.props.formData.title = title;
      inputs.push(title);
    }
    for(i=0; i<props.items.length; i++) {
      props.items[i].children.props.schema.properties.genericPhysics.properties.simulatedInput.enum = inputs;
    }
  }
  return (
    <fieldset className={props.className}>
      <ArrayFieldTitle
        key={`array-field-title-${props.idSchema.$id}`}
        TitleField={props.TitleField}
        idSchema={props.idSchema}
        title={props.title}
        required={props.required}
      />
      {props.schema.description &&
        <div
          className="field-description"
          key={`field-description-${props.idSchema.$id}`}
        >
          {props.schema.description}
        </div>}

      <div
        className="array-item-list"
        key={`array-item-list-${props.idSchema.$id}`}
      >
        {props.items && props.items.map(DefaultArrayItem)}
      </div>
      {props.canAdd &&
        <AddButton
          onClick={props.onAddClick}
          disabled={props.disabled || props.readonly}
        />}
    </fieldset>
  );
}

export default ArrayFieldTemplate