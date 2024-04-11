import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map')
  public divMap ?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat: LngLat =  new LngLat(-86.77284719707461, 36.1587928093775);

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado.';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', //style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    this.readFromLocalStorage();

    // // Crea un documento HTML personalizado
    // const markerHtml = document.createElement('div');
    // // Añade lo que contiene el div markerHTML
    // markerHtml.innerHTML = 'Laura Alarcon'

    // // Crea un marcador y se añade al mapa instanciado
    // const marker = new Marker({
    //   // Personaliza propiedades del marcador
    //   // color: 'orange'
    //   // Indica que el markerHTML será el elemento que se mostrará como marcador
    //   element: markerHtml
    // }).setLngLat( this.currentLngLat )
    // .addTo( this.map );

  }

  createMarker() {
    if( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color );
  }

  addMarker( lngLat: LngLat, color: string ) {
    // Si el mapa no existe, no hacer nada
    if( !this.map ) return;
    // Si el mapa existe, crear un nuevo marcador en las coordenadas
    // almaccenadas en lngLat y añadirlo al mapa
    const marker = new Marker({
      color: color,
      // con draggable, el marcador puede moverse / cambiar de posicion
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

    // Extrae 'id' y color de los marcadores que se van creando
    this.markers.push( { color, marker, });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage() );

  }

  deleteMarker( index: number ) {
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
    this.saveToLocalStorage();
  }

  flyTo( marker: Marker ) {

    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });

  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));

  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); //! OJO

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );

      this.addMarker( coords, color );
    } )
  }

}
