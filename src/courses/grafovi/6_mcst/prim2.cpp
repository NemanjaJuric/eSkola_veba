#include <iostream>
#include <vector>
#include <utility>
#include <functional>
#include <queue>

using namespace std;


vector<vector<pair<int,pair<int,int> > >>g={   
    {make_pair(2,make_pair(0,1)),make_pair(6,make_pair(0,3)) },  
    {make_pair(2,make_pair(1,0)),make_pair(3,make_pair(1,2)),make_pair(8,make_pair(1,3)),make_pair(5,make_pair(1,4)) },  
    {make_pair(3,make_pair(2,1)),make_pair(7,make_pair(2,4)) },  
    {make_pair(6,make_pair(3,0)),make_pair(8,make_pair(3,1)),make_pair(9,make_pair(3,4)) },  
    {make_pair(5,make_pair(4,1)),make_pair(7,make_pair(4,2)),make_pair(9,make_pair(4,3)) } };
int n,e,used[10005];
priority_queue<pair<int,pair<int,int> >, vector<pair<int,pair<int,int> > >, greater<pair<int,pair<int,int> > > > pq;

void process(int u)                     // funkcija za obradu cvora
{
    used[u]=1;                          // kazemo da je 'obradjen' tj. dodat u trenutni mcst
    for(int i=0;i<g[u].size();i++)      // idemo po susedima
    {
        int v=g[u][i].second.second;
        if(!used[v])                    // za neobradjenog suseda dodajemo granu u pq
            pq.push(g[u][i]);
    }
}

int Prim() // slozenost algoritma je  O(E Log V) gde je E broj grana a V broj cvorova grafa
{
    int a=0;
    process(1);                         // krecemo od cvora 1
    while(!pq.empty())                  // dok god red sa prioritetom nije prazan
    {
        int v=pq.top().second.second, u=pq.top().second.first, w=pq.top().first;  // uzimamo sledeci element - granu
        pq.pop();
        if(!used[v])                    // ako nije obradjen, potrebno ga je obraditi
        {
            cout<<"grana:"<<u<<"-"<<v<<" tezina "<<w<<"\n"; // ispisemo granu
            a+=w;                  // dodajemo tezinu na ukupnu tezinu mcst
            process(v);                 // i zatim ga obradjujemo
        }
    }
    return a;
}

// ucitavanje i ispis stabla za ucitan graf
int main()
{
    
    cout << "Primov algoritam: " << endl;
    int a=Prim();
    cout<<"Ukupna tezina: "<<a;
    return 0;
}
