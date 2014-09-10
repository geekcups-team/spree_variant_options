$.extend({
  keys: function(obj){
    var a = [];
    $.each(obj, function(k){ a.push(k) });
    return a;
  }
});

if (!Array.indexOf) Array.prototype.indexOf = function(obj) {
  for(var i = 0; i < this.length; i++){
    if(this[i] == obj) {
      return i;
    }
  }
  return -1;
}

if (!Array.find_matches) Array.find_matches = function(a) {
  var i, m = [];
  a = a.sort();
  i = a.length
  while(i--) {
    if (a[i - 1] == a[i]) {
      m.push(a[i]);
    }
  }
  if (m.length == 0) {
    return false;
  }
  return m;
}

function VariantOptions(params) {

  var options = params['options'];
  var i18n = params['i18n'];
  var allow_backorders = !params['track_inventory_levels'];
  var allow_select_outofstock = params['allow_select_outofstock'];
  var default_instock = params['default_instock'];

  var variant, divs, parent, index = 0;
  var selection = [];
  var buttons;


  function init() {
    initSelect();
    $('.select-option-type:eq(0)').trigger('change');
  }
  
  function initSelect() {
    $('#product-variants-select select').on('change',selectChange);
  }
  
  function selectChange(){
    current_select = $(this);
    next_index = $.inArray($(this).get(0),$('.select-option-type')) + 1;
    next_select = $('.select-option-type').get(next_index);
    
    // if ($(this).parent('div').next('div').length > 0  && $(this).parent('div').next('div').attr('id').match(/\d+/)[0] != undefined) {
    if (next_select) {
      variant = null;
      selection = [];
      
      // j = $(this).parent('div').next('div').attr('id').match(/\d+/)[0];
      

      rel = current_select.find(':selected').val();
      // show_variant_images(rel.split('-')[0]);
    
      // Mi tiro su tutte le selection con il prezzo.
      key = rel.split('-');
      
      var v = options[key[0]][key[1]];
      keys = $.keys(v);
      var m = Array.find_matches(selection.concat(keys));
      if (selection.length == 0) {
        selection = keys;
      } else if (m) {
        selection = m;
      }
    
      var variants = get_variant_objects(rel);
    
      // opts = $('#option_type_' + j).find('option')
      opts = $(next_select).find('option')
      // variants_array = new Array();
      var first = true;
      // Per ogni elemento disponibile come option value lo abilito e seleziono il primo
      opts.each(function(i, element) {
         v = get_variant_objects($(element).val());
         variant_obj = variants[$.keys(v)[0]];
         if(variants[$.keys(v)[0]] == undefined)
         {
           $(element).attr('disabled',true);
         }else{
           if (first) {
               $(element).attr('selected','selected');
               $('[itemprop="price"]').text(variants[$.keys(v)[0]].price);
               show_variant_images(variants[$.keys(v)[0]].id);
               first = false;
           }
           $(element).attr('disabled',false);
           if (!variant_obj.in_stock) {
             $(element).data('in-stock',false)
           }else{
             $(element).data('in-stock',true)
           }
         }
       
      });
      
      // Propago alla successiva option type
      $(next_select).trigger('change');
      // $('#add-to-cart-button').prop('disabled',true);
    }else{
      $('#add-to-cart-button').prop('disabled',false);
      var current_variant = get_variant_objects(current_select.val())
      current_variant = current_variant[$.keys(current_variant)[0]]
      $('[itemprop="price"]').text(current_variant.price);
      show_variant_images(current_variant.id);
      $('[name*=products]').val(current_variant.id);
      $('[name=variant_id]').val(current_variant.id);

    }
    
    
  }

  function get_index(parent) {
    return parseInt($(parent).attr('class').replace(/[^\d]/g, ''));
  }

 

  function get_variant_objects(rels) {
    var i, ids, obj, variants = {};
    if (typeof(rels) == 'string') { rels = [rels]; }
    var otid, ovid, opt, opv;
    i = rels.length;
    try {
      while (i--) {
        ids = rels[i].split('-');
        otid = ids[0];
        ovid = ids[1];
        opt = options[otid];
        if (opt) {
          opv = opt[ovid];
          ids = $.keys(opv);
          if (opv && ids.length) {
            var j = ids.length;
            while (j--) {
              obj = opv[ids[j]];
              if (obj && $.keys(obj).length && 0 <= selection.indexOf(obj.id.toString())) {
                variants[obj.id] = obj;
              }
            }
          }
        }
      }
    } catch(error) {
      //console.log(error);
    }
    return variants;
  }

  function to_f(string) {
    return string ? parseFloat(string.replace(/[^\d\.]/g, '')) : 0;
  }

 
  $(document).ready(init);

};
