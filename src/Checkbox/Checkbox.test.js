import React from 'react';
import Checkbox from './Checkbox';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Checkbox />', () => {
  describe('behaviour tests', () => {
    let checked = false;
    let component;
    let tree;
    let reRender;
    const makeRenderer = component =>
      () => tree = component.toJSON();

    beforeEach(() => {
      component = renderer.create(
        <Checkbox
          onChange={_e => checked = !checked}
          checked={checked}
          isSwitch
          id="00-0"
        />);
      reRender = makeRenderer(component);
      reRender();
    })

    it('match snapshot' , () => {
      expect(tree).toMatchSnapshot();
    });


    it('is true after a click', () => {
      tree.children[0].props.onChange();
      reRender();
      expect(checked).toBe(true);
    });

    it('is false after two clicks', () => {
      tree.children[0].props.onChange();
      tree.children[0].props.onChange();
      reRender();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('disabled behaviour tests', () => {
    let checked = false;
    let component;
    let tree;
    let reRender;
    const makeRenderer = component =>
      () => tree = component.toJSON();

    beforeEach(() => {
      component = renderer.create(
        <Checkbox
          onChange={_e => checked = !checked}
          checked={checked}
          id="00-1"
          disabled
        />);
      reRender = makeRenderer(component);
      reRender();
    })

    it('match snapshot', () => {
      expect(tree).toMatchSnapshot();
    });


    it('still false after a click', () => {
      tree.props.onChange();
      reRender();
      expect(checked).toBe(false);
    });

  });

  describe('dom tests', () => {
    let checked = false;
    let component;

    beforeEach(() => {
      component = shallow(
        <Checkbox
          name='test_checkbox'
          id="00-2"
          onChange={_e => checked = !checked}
          checked={checked}
        />
      );
    })

    it('renders an input', () => {
      expect(component.name()).toBe("input");
    });

    it('name is test_checkbox', () => {
      expect(component.prop('name')).toBe("test_checkbox");
    });
  });

});
